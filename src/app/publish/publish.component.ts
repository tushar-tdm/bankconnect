import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SignupServiceService} from '../services/signup-service.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface API {
  id: number;
  name: string;
}


@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  apiservicesform: FormGroup;
  apilist: Array<String> = [];
  apiselected = [];
  noapierror: boolean = true;

  constructor(private formBuilder: FormBuilder, private signservice : SignupServiceService, private router: Router,private route: ActivatedRoute) {
    this.apilist = this.route.snapshot.data['apilist'];
  }

  ngOnInit()
  {
      this.apiservicesform = this.formBuilder.group({
        apis : this.addApisControls(),
      });
  }

  addApisControls(){
    var arr = this.apilist.map(element =>{
      return this.formBuilder.control(false);
    });

    return this.formBuilder.array(arr);
  }

  get apilistArray(){
    return <FormArray>this.apiservicesform.get('apis')
  }

  getapiselected(){
    this.apiselected = [];
    this.apilistArray.controls.forEach((control, i)=>{
      if(control.value){
        this.apiselected.push(this.apilist[i]);
      }
    });
  }

  OnSubmit() {
    //this has all the apis to be published on bankconnect as well as api manager
    var newItem = this.apiselected;
    var apivalue = [];

    for(let item of newItem){
      var lowerItem = item.toLowerCase().replace(/\s/g, "");;
      console.log(lowerItem);
      apivalue.push(lowerItem);
    }

    // ====== PUBLISHING IN BANK CONNECT CLIENT ===============
    this.signservice.getEmail()
    .subscribe((data)=>{
      console.log("email of user: "+data);

      var newobj = {
        apis : newItem,
        email : data,
        value : apivalue 
      }

      this.signservice.postInClient(newobj)
      .subscribe((data)=>{
        console.log("data received: "+data);
      },(err)=> console.log(err));
      
    })

  }

  shownext(){
    (document.querySelector('.bankstandard') as HTMLElement).style.display = 'block';
  }

}
