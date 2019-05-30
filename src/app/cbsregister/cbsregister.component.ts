import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SignupServiceService} from '../services/signup-service.service';
import { Router } from '@angular/router';

export interface CBS {
  value: string;
  viewValue: string;
}

// tslint:disable-next-line: class-name
export interface version {
  value: string;
  viewValue: string;
}

export interface intopt {
  value : string;
  viewValue: string;
}

@Component({
  selector: 'app-cbs',
  templateUrl: './cbsregister.component.html',
  styleUrls: ['./cbsregister.component.scss']
})
export class CbsregisterComponent implements OnInit{

  // ngOnChanges(changes: SimpleChanges): void {  }

  // formpart : Number = 1;
  // loadingpart: Number = 0;

  @Input() selectedCBS: string;
  selectedversion: string;
  selectedInt: string;
  CBSForm;

  cbslist: CBS[] = [
    {value: 'Finnacle', viewValue: 'Finnacle'},
    {value: 'TCS Bancs', viewValue: 'TCS BaNCS'}, //TCS Bancs is the spelling in database
    {value: 'Flexcube', viewValue: 'Flexcube'}
  ];

  versions: version[] = [
    {value: 'v10.0.1', viewValue: 'v10.0.1'},
    {value: 'v10.2.0', viewValue: 'v10.2.0'},
    {value: 'v11.1.1', viewValue: 'v11.1.1'}
  ];

  verver : any = {};
  fin : Array<string> = [];
  tcs : Array<string> = [];
  flex : Array<string> = [];

  intoptions: intopt[] = [
    {value: 'FI', viewValue: 'FI Integrator'},
    {value: 'TCP', viewValue: 'TCP-IP ISO 8385'}
  ];

// tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private signservice : SignupServiceService, private router: Router) { }

  ngOnInit() {
    this.CBSForm = this.formBuilder.group({
      CBS: ['', [Validators.required, Validators]],
      version: ['',[Validators.required, Validators]],
      IntOpt: ['',[Validators.required, Validators]],
      SIP: ['', [Validators.required, Validators]],
      cred: ['', [Validators.required, Validators]],
    });

    //get the versions from the database
    //make a get request
    this.signservice.getVersions()
      .subscribe((data:any)=>{
        this.fin = data.fin;
        this.tcs = data.tcs;
        this.flex = data.flex;
        console.log(this.fin+" "+this.tcs+" "+this.flex);
      },(err:any)=> console.log("error while getting versions "+err));
  }

  onSubmit(){
      var myObj = {
        cbs : this.CBSForm.controls.CBS.value,
        version : this.CBSForm.controls.version.value,
        intopt : this.CBSForm.controls.IntOpt.value,
        sip : this.CBSForm.controls.SIP.value,
        cred : this.CBSForm.controls.cred.value
      }

    console.log(this.CBSForm.controls.IntOpt.value);
      if(1){
        console.log("valid data: "+ myObj);
        this.signservice.sendCbsDetails(myObj)
        .subscribe((data:any)=>{
          console.log(data);
        } , (err:any)=> console.log(err));
      } else {
        alert('not good');
      }

      this.router.navigateByUrl('/corebankservices/success');
   }

   newCbs(value){
     //set the versions list to corresponding version
    console.log(value);
    if(value == "Finnacle"){
      this.verver = this.fin;
      console.log("verver updated: "+this.verver);
    }else if(value == "TCS Bancs"){
      this.verver = this.tcs;
      console.log("verver updated: "+this.verver);
    }else{
      this.verver = this.flex;
      console.log("verver updated: "+this.verver);
    }

    (document.querySelector('.version-div') as HTMLElement).style.display = 'block';
    (document.querySelector('.cbs-div') as HTMLElement).style.top = 'none';
   }

   showintopt(){
    (document.querySelector('.version-div') as HTMLElement).style.display = 'none';
    (document.querySelector('.intopt-div') as HTMLElement).style.display = 'block';
   }

   showcred(){
    (document.querySelector('.intopt-div') as HTMLElement).style.display = 'none';
    (document.querySelector('.cred-div') as HTMLElement).style.display = 'block';
   }
}
