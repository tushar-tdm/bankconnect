import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { SignupServiceService} from '../services/signup-service.service';
import { Router } from '@angular/router';

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
  apilist: Array<String> = ['Account','Payment','Transaction'];
  apiselected = [];
  noapierror: boolean = true;

  orders = [
    { id: 100, name: 'Payments'},
    { id: 200, name: 'Accounts'},
    { id: 100, name: 'Transaction'},
    { id: 200, name: 'Remittance'},
  ];
  nestedForm: any;


  constructor(private formBuilder: FormBuilder, private signservice : SignupServiceService, private router: Router) {
    // this.apiservicesform = this.formBuilder.group({
    //   orders: new FormArray([])
    // });
    // this.addCheckboxes();
  }

  // private addCheckboxes() {
  //   this.orders.map((o, i) => {
  //     const control = new FormControl(i === 0); // if first item set to true, else false
  //     (this.apiservicesform.controls.orders as FormArray).push(control);
  //   });
  // }

  ngOnInit()
  {
      // this.signservice.getApis()
      // .subscribe((data)=>{
      //   console.log("api reply: "+data);
      //   for(var i=0;i<data.length;++i){
      //     console.log(data[i]);
      //     this.apilist.push(data[i]);
      //   }
      //   console.log("this is the api list "+this.apilist);
      // },(err)=> console.log(err));
      
      this.apiservicesform = this.formBuilder.group({
        apis : this.addApisControls()
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
    //this.noapierror = this.apiselected.length > 0 ? false : true;
  }

  OnSubmit() {

    var newItem = this.apiselected;
    console.log({...this.apiservicesform.value,newItem});
    console.log(newItem);

    var obj = {
      apis : newItem
    }

     this.signservice.postApis(obj)
     .subscribe((data)=>{
       alert(data);

      this.router.navigateByUrl('/api');
    },(err)=>{ console.log(err); })
  }

}
