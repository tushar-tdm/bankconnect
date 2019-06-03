import { Component, OnInit } from '@angular/core';
import { SignupServiceService} from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  select_api : Array<String> = [];
  integrated : Number = 0;
  confirmed : Number = 0;
  Integration : FormGroup;

  constructor(private signservice: SignupServiceService, private route: ActivatedRoute,private fb: FormBuilder) { 
    this.select_api = this.route.snapshot.data['selected_api'];
    console.log(this.select_api);
  }

  ngOnInit() {

    this.Integration = this.fb.group({
      secureToken: ['',[Validators.required,Validators]]
    });

    //make a call to service to know whether the confirmation is done or not.
    this.signservice.integrated()
    .subscribe((data)=>{
      console.log(data);
      this.integrated = data;
    },(err)=> console.log(err));

    this.signservice.confirmed()
    .subscribe((data)=>{
      console.log(data);
      this.confirmed = data;
    },(err)=>console.log(err));
  }
  check(){
    //Integraton
    var token = this.Integration.controls.secureToken.value;
    console.log(token);
    if('weijd67wuyfiyi84fo4d39rdewdo0ur3' == token){
      (document.querySelector('.ibcform') as HTMLElement).style.display='none';  
      (document.querySelector('.message') as HTMLElement).style.display='block';  
    }else{
      alert("Wrong Secure Token!");
    }
  }

  showibc(){
    (document.querySelector('.ibc') as HTMLElement).style.display='none';
    (document.querySelector('.ibcform') as HTMLElement).style.display='block';
  }

}
