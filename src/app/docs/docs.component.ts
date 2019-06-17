import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  Image:any = '../../assets/demo.jpg';
  User:any;
  Org:any;

  constructor(private signservice: SignupServiceService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      console.log("here:->"+params['user']);
      var obj = {
        user : params['user']
      }
      this.User = params['user'];
      this.Org = params['org'];

      this.signservice.setDocs(obj)
      .subscribe((data)=>console.log(data),(err)=>console.log(err));
    });
   }

  ngOnInit() {
    
  }

  accept(){
    //this.User is the email

    var myObj = {
      email: this.User,
      status: true,
      org : this.Org
    }
    this.signservice.setPartner(myObj)
    .subscribe((data)=>console.log(data),(err)=>console.log(err));
  }

  decline(){
    var myObj = {
      user: this.User,
      status: false,
      org : this.Org
    }
    this.signservice.setPartner(myObj)
    .subscribe((data)=>console.log(data),(err)=>console.log(err));
  }

}
