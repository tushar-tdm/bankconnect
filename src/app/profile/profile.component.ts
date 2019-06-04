import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupServiceService} from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  roleForm: FormGroup;
  passForm : FormGroup;
  registryForm : FormGroup;

  title = "PROFILE";

  profile=1;pass=0;roles=0;registry=0;
  profileClass = {
    "buttons" : true,
    "options" : true
  };

  passClass = {
    "buttons" : true,
    "options" : false 
  }; 

  rolesClass = {
    "buttons" : true,
    "options" : false 
  }; 

  registryClass = {
    "buttons" : true,
    "options" : false 
  }; 
  

  show_user_profile: Array<String> = [];

  constructor(private signservice: SignupServiceService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.show_user_profile = this.route.snapshot.data['user_profile'];
    console.log(this.show_user_profile);
  }

  ngOnInit(){
    this.roleForm = this.formBuilder.group({
      role: ['', [Validators.required, Validators]],
      userType: ['',[Validators.required, Validators]],
      email: ['',[Validators.required, Validators]],
    });

    this.passForm = this.formBuilder.group({
      old : ['',[Validators.required,Validators]],
      new : ['',[Validators.required,Validators]],
      renew : ['',[Validators.required,Validators]]
    });

    this.registryForm = this.formBuilder.group({
      registryType : ['',[Validators.required,Validators]]
    });
  }

  onPassSubmit(){
    var myObj = {
      role : this.roleForm.controls.role.value,
      type : this.roleForm.controls.userType.value,
      email : this.roleForm.controls.email.value
    }
    console.log("role details: "+myObj);
    this.signservice.sendRoleDetails()
    .subscribe((data)=>{
      console.log(data + "from sendRoleDetails");
    },(err)=> console.log(err));
  }

  onRoleSubmit(){
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

  onRegistrySubmit(){
    var myObj = {
      registry : this.registryForm.controls.registryType.value
    }
    console.log("registry details: "+myObj);
    this.signservice.sendRegistryDetails()
    .subscribe((data)=>{
      console.log(data + "from sendRegistryDetails");
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

    this.rolesClass = {
      "buttons" : true,
      "options" :false
    };

    this.registryClass = {
      "buttons" : true,
      "options" :false
    };

    this.title = "PROFILE";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'block';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.userrole') as HTMLElement).style.display = 'none';
    (document.querySelector('.registry') as HTMLElement).style.display = 'none';
  }

  show_roles(){
    this.profileClass = {
      "buttons" : true,
      "options" : false 
    };
    
    this.passClass = {
      "buttons" : true,
      "options" :false
    };

    this.rolesClass = {
      "buttons" : true,
      "options" :true
    };

    this.registryClass = {
      "buttons" : true,
      "options" :false
    };

    this.title = "ASSIGN ROLES";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.userrole') as HTMLElement).style.display = 'block';
    (document.querySelector('.registry') as HTMLElement).style.display = 'none';
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

    this.rolesClass = {
      "buttons" : true,
      "options" :false
    };

    this.registryClass = {
      "buttons" : true,
      "options" :false
    };

    this.title = "CHANGE PASSWORD";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'block';
    (document.querySelector('.userrole') as HTMLElement).style.display = 'none';
    (document.querySelector('.registry') as HTMLElement).style.display = 'none';
  }
  show_registry(){
    this.profileClass = {
      "buttons" : true,
      "options" : false 
    };
    
    this.passClass = {
      "buttons" : true,
      "options" :false
    };

    this.rolesClass = {
      "buttons" : true,
      "options" :false
    };

    this.registryClass = {
      "buttons" : true,
      "options" :true
    };

    this.title = "REGISTRY";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.userrole') as HTMLElement).style.display = 'none';
    (document.querySelector('.registry') as HTMLElement).style.display = 'block';
  }
}

