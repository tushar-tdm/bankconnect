var express = require('express');
var path = require('path');
var app = express();

//======== for file upload ============
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var filemodel = require('./models/filemodel');

var posts = require('./routes/posts');
var routes = require('./routes/routes');

MongoClient.connect('mongodb://localhost:27017/idbp', function(err, client){
  if(err){ 
    console.log("Please check you db connection parameters");
  }else{
    console.log("Connection success");
    // converting the file to base64 format
    var file_path = __dirname+'/test.txt';
    var data = fs.readFileSync(file_path);
    var f_data = data.toString('base64');

    //this is to read the base64 file to string.
    var b = new Buffer(f_data,'base64');
    var s = b.toString();
    console.log("string from base64 format:"+s);

    var db = client.db('idbp');
    var collection = db.collection('files');
    collection.insertOne({file : f_data},(err,res)=>{
        if(err) console.log(err);
    });

  }
});

app.use(express.static(path.join(__dirname,'..','dist','bankConnect')));
app.use('/posts',posts);
//app.use('/',routes);


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../dist/bankConnect/index.html'));
})

app.listen(5000,()=>{
    console.log("listening to 5000");
});