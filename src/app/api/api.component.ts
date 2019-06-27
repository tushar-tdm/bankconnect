import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SignupServiceService } from '../services/signup-service.service';
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

  constructor(private formBuilder: FormBuilder, private signservice: SignupServiceService, private router: Router, private route: ActivatedRoute) {
    this.apilist = this.route.snapshot.data['apiList'];
  }

  ngOnInit() {
    this.apiservicesform = this.formBuilder.group({
      apis: this.addApisControls(),
      environment: ['', [Validators.required, Validators]],
    });
  }

  //this is to get the total number of form builder wrt to the elements in the list
  addApisControls() {
    var arr = this.apilist.map(element => {
      return this.formBuilder.control(false);
    });

    return this.formBuilder.array(arr);
  }

  //this is to get the selected api's (or all the apis from the form builder as formcontrol)
  get apilistArray() {
    return <FormArray>this.apiservicesform.get('apis')
  }

  //this is called everytime a chcekbox is selected or unselected and the list is updated
  getapiselected() {
    this.apiselected = [];
    this.apilistArray.controls.forEach((control, i) => {
      if (control.value) {
        this.apiselected.push(this.apilist[i]);
      }
    });
  }

  OnSubmit() {
    var newItem = this.apiselected;
    var apivalue = [];

    for (let item of newItem) {
      var lowerItem = item.toLowerCase().replace(/\s/g, "");;
      console.log(lowerItem);
      apivalue.push(lowerItem);
    }

    console.log("api value: " + apivalue);
    var obj = {
      apis: newItem,
      value: apivalue,
      env: this.apiservicesform.controls.environment.value,
    }

    this.signservice.postApis(obj)
      .subscribe((data) => {
        this.router.navigateByUrl('/dashboard');
      }, (err) => { console.log(err); })

  }

  shownext() {
    (document.querySelector('.bankstandard') as HTMLElement).style.display = 'block';
  }
}
