import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SignupServiceService} from '../services/signup-service.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface API {
  id: number;
  name: string;
}


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  apiservicesform: FormGroup;
  apilist: Array<String> = [];
  apiselected = [];
  noapierror: boolean = true;

  constructor(private formBuilder: FormBuilder, private signservice : SignupServiceService, private router: Router,private route: ActivatedRoute) {
    this.apilist = this.route.snapshot.data['apiList'];
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
    var newItem = this.apiselected;
    var obj = {
      apis : newItem,
    }

    this.signservice.getEmail()
    .subscribe((data)=>{
      console.log("email of user: "+data);

      var newobj = {
        apis : newItem,
        email : data
      }

      this.signservice.postInClient(newobj)
      .subscribe((data)=>{
        console.log("data received: "+data);
      },(err)=> console.log(err));
    })


     this.signservice.postApis(obj)
     .subscribe((data)=>{
      this.router.navigateByUrl('/dashboard');
    },(err)=>{ console.log(err); })

  }

  shownext(){
    (document.querySelector('.bankstandard') as HTMLElement).style.display = 'block';
  }
}
