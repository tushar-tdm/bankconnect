import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupServiceService} from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bmprofile',
  templateUrl: './bmprofile.component.html',
  styleUrls: ['./bmprofile.component.scss']
})
export class BmprofileComponent implements OnInit {
  roleForm: FormGroup;
  passForm : FormGroup;

  title = "PROFILE";
  profile=1;pass=0;pending=0;

  profileClass = {
    "buttons" : true,
    "options" : true
  };

  pendingClass = {
    "buttons" : true,
    "options" : false
  };

  passClass = {
    "buttons" : true,
    "options" : false
  };

  partnerClass = {
    "buttons" : true,
    "options" : false
  };

  show_user_profile: any ;
  requests: any;

  constructor(private signservice: SignupServiceService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    this.show_user_profile = this.route.snapshot.data['bmuser_profile'];
    console.log(this.show_user_profile);
  }

  ngOnInit() {
    this.passForm = this.formBuilder.group({
      old : ['',[Validators.required,Validators]],
      new : ['',[Validators.required,Validators]],
      renew : ['',[Validators.required,Validators]]
    });

    this.signservice.getRequests()
    .subscribe((data)=>{
      console.log(data);
      this.requests = data;
    },(err)=>console.log(err));
  }

  onPassSubmit(){
    var myObj = {
      old : this.passForm.controls.role.value,
      new : this.passForm.controls.userType.value,
      renew : this.passForm.controls.email.value
    }
    console.log("role details: "+myObj);
    this.signservice.sendPassDetails()
    .subscribe((data)=>{
      console.log(data + "from sendRoleDetails");
    },(err)=> console.log(err));
  }

  show_profile(){
    this.profileClass = {
      "buttons" : true,
      "options" : true
    };

    this.passClass = {
      "buttons" : true,
      "options" :false
    };

    this.pendingClass = {
      "buttons" : true,
      "options" :false
    };

    this.partnerClass = {
      "buttons" : true,
      "options" : false
    };


    this.title = "PROFILE";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'block';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.pendingreq') as HTMLElement).style.display = 'none';
    (document.querySelector('.partner') as HTMLElement).style.display = 'none';
  }

  show_pass(){
    this.profileClass = {
      "buttons" : true,
      "options" : false
    };

    this.passClass = {
      "buttons" : true,
      "options" :true
    };

    this.pendingClass = {
      "buttons" : true,
      "options" :false
    };

    this.partnerClass = {
      "buttons" : true,
      "options" : false
    };


    this.title = "PROFILE";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'block';
    (document.querySelector('.pendingreq') as HTMLElement).style.display = 'none';
    (document.querySelector('.partner') as HTMLElement).style.display = 'none';

  }

  show_pending(){
    this.profileClass = {
      "buttons" : true,
      "options" : false
    };

    this.passClass = {
      "buttons" : true,
      "options" :false
    };

    this.pendingClass = {
      "buttons" : true,
      "options" :true
    };

    this.partnerClass = {
      "buttons" : true,
      "options" : false
    };


    this.title = "PROFILE";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.pendingreq') as HTMLElement).style.display = 'block';
    (document.querySelector('.partner') as HTMLElement).style.display = 'none';

  }

  show_partner(){
    this.profileClass = {
      "buttons" : true,
      "options" : false
    };

    this.passClass = {
      "buttons" : true,
      "options" :false
    };

    this.pendingClass = {
      "buttons" : true,
      "options" :false
    };

    this.partnerClass = {
      "buttons" : true,
      "options" : true
    }


    this.title = "PARTNERS";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.pendingreq') as HTMLElement).style.display = 'none';
    (document.querySelector('.partner') as HTMLElement).style.display = 'block';

  }

  accept(i,name){
    //i is the request number.
    //remove the request from pending and send a mail.
    var myObj = {
      id : i,
      state : true, //false if declined
      name : name
    }
    this.signservice.pendingReq(myObj)
    .subscribe((data)=>{ console.log(data);}
    ,(err)=> console.log(err))
  }

  decline(i,name){
    var myObj = {
      id : i,
      state : false,
      name : name
    }
    this.signservice.pendingReq(myObj)
    .subscribe((data)=>{ console.log(data);}
    ,(err)=> console.log(err))
  }
}
