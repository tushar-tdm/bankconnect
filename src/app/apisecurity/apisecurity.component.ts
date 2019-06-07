import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupServiceService } from '../services/signup-service.service';

@Component({
  selector: 'app-apisecurity',
  templateUrl: './apisecurity.component.html',
  styleUrls: ['./apisecurity.component.scss']
})
export class ApisecurityComponent implements OnInit {

  public form: FormGroup;
  public ApiList: FormArray;

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get('apis') as FormArray;
  }
  selectedApi : Array<string>;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private signservice: SignupServiceService, private router : Router) {
    this.selectedApi = this.route.snapshot.data['selectedApi'];
    //console.log("this is the apilist: "+this.selectedApi);
   }

  ngOnInit() {
    this.form = this.fb.group({
      // cbs: [null, Validators.compose([Validators.required])],
      // version: [null],
      apis: this.fb.array([]) //creates a single api.
    });

    // set ApiList to this field
    this.ApiList = this.form.get('apis') as FormArray;

    for(let api of this.selectedApi){
       this.addApi();
    }
  }

  createApi(): FormGroup {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required])], // i.e. Home, Office
      security: [null, Validators.compose([Validators.required])]
    });
  }

  // add a contact form group
  //now this should be called according to the number of apis selected.
  addApi() {
    this.ApiList.push(this.createApi());
  }

  // triggered to change validation of value field type
  // changedFieldType(index) {
  //   let validators = null;

  //   if (this.getContactsFormGroup(index).controls['type'].value === 'email') {
  //     validators = Validators.compose([Validators.required, Validators.email]);
  //   } else {
  //     validators = Validators.compose([
  //       Validators.required,
  //       Validators.pattern(new RegExp('^\\+[0-9]?()[0-9](\\d[0-9]{9})$')) // pattern for validating international phone number
  //     ]);
  //   }

  //   this.getContactsFormGroup(index).controls['value'].setValidators(
  //     validators
  //   );

  //   this.getContactsFormGroup(index).controls['value'].updateValueAndValidity();
  // }

  // get the formgroup under contacts form array
  getApiFormGroup(index): FormGroup {
    this.ApiList = this.form.get('apis') as FormArray;
    const formGroup = this.ApiList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  submit() {
    console.log(this.form.value);

    var myObj = {
      sec : this.form.value
    }
    
    this.signservice.updateSecurity(myObj)
    .subscribe((data)=>{
      console.log(data);
    },(err)=> console.log(err));

    this.router.navigateByUrl('/profile');
  }

}
