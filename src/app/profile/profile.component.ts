import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupServiceService} from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  roleForm: FormGroup;
  passForm : FormGroup;
  registryForm : FormGroup;
  BCIntegration : FormGroup;


  title = "PROFILE";

  profile=1;pass=0;roles=0;registry=0;bankconnect=0;
  BCintegrated : Number;
  profileClass = {
    "buttons" : true,
    "options" : true
  };

  bankconnectClass = {
    "buttons" : true,
    "options" : false
  }

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

  securityClass = {
    "buttons" : true,
    "options" : false
  }


  show_user_profile: any ;
  public tokenintegratebutton = false;


  constructor(private signservice: SignupServiceService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router,
    private zone : NgZone) {
    this.show_user_profile = this.route.snapshot.data['user_profile'];
    console.log(this.show_user_profile);

    this.signservice.getUserType()
    .subscribe((data)=>{
      console.log("came to check the profile type: "+ data);
      if(data == "admin")
        this.router.navigateByUrl('/profile');
      else if(data == "business"){
        this.zone.run(() => this.router.navigateByUrl('/bmprofile'));
        console.log("navigation did not work");
      }
      else if(data == "product")
        this.router.navigateByUrl('/pmprofile');
      else if(data == "api")
        this.router.navigateByUrl('/amprofile');
      else
        this.router.navigateByUrl('/login');
    },(err)=>console.log(err));

  }

  ngOnInit(){
    this.roleForm = this.formBuilder.group({
      role: ['', [Validators.required, Validators]],
      userType: ['',[Validators.required, Validators]],
      email: ['',[Validators.required, Validators]]
    });

    this.passForm = this.formBuilder.group({
      old : ['',[Validators.required,Validators]],
      new : ['',[Validators.required,Validators]],
      renew : ['',[Validators.required,Validators]]
    });

    this.registryForm = this.formBuilder.group({
      registryType : ['',[Validators.required,Validators]]
    });

    this.signservice.checkbcintegrated()
    .subscribe((data)=>{
      console.log('BCintegrated:' + data);
      this.BCintegrated = data;
    }, (err) => console.log(err));

    if(!this.BCintegrated){
      this.BCIntegration = this.formBuilder.group({
        secureToken: ['',[Validators.required,Validators]]
      });
    }
  }

  onRoleSubmit(){
    var myObj = {
      role : this.roleForm.controls.role.value,
      type : this.roleForm.controls.userType.value,
      email : this.roleForm.controls.email.value
    }
    console.log("role details: "+JSON.stringify(myObj));
    this.signservice.sendRoleDetails(myObj)
    .subscribe((data)=>{
      console.log(data + "from sendRoleDetails");
    },(err)=> console.log(err));
  }

  onPassSubmit(){
    var myObj = {
      old : this.passForm.controls.role.value,
      new : this.passForm.controls.userType.value,
      renew : this.passForm.controls.email.value
    }
    console.log("pass details: "+myObj);
    this.signservice.sendPassDetails()
    .subscribe((data)=>{
      console.log(data + "from sendpassDetails");
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

  check(){
    //BCIntegraton
    // show box message
    this.tokenintegratebutton = true;
    setTimeout(function() {
      this.tokenintegratebutton = false;
      var token = this.BCIntegration.controls.secureToken.value;
      console.log(token);
      if('weijd67wuyfiyi84fo4d39rdewdo0ur3' == token){
        (document.querySelector('.bankconnecttoken') as HTMLElement).style.display='none';
        (document.querySelector('.bankconnectmessage') as HTMLElement).style.display='block';
      }else{
        alert("Wrong Secure Token!");
      }
      this.signservice.confirmbcintegrated()
      .subscribe((data) =>{
        console.log(data);
      }, (err) => console.log(err));

    }.bind(this), 3000);

  }

  show_profile(){
    this.profileClass = {
      "buttons" : true,
      "options" : true
    };

    this.bankconnectClass = {
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
      "options" :false
    };

    this.securityClass = {
      "buttons" : true,
      "options" :false
    };

    this.title = "PROFILE";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'block';
    (document.querySelector('.bankconnect') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.userrole') as HTMLElement).style.display = 'none';
    (document.querySelector('.registry') as HTMLElement).style.display = 'none';
    (document.querySelector('.security') as HTMLElement).style.display = 'none';
  }

  show_bankconnect(){
    this.profileClass = {
      "buttons" : true,
      "options" : false
    };

    this.bankconnectClass = {
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

    this.securityClass = {
      "buttons" : true,
      "options" :false
    };

    this.title = "BANK CONNECT INTEGRATION";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    if(this.BCintegrated){
      console.log('Entered message section');
      (document.querySelector('.bankconnect') as HTMLElement).style.display = 'block';
      (document.querySelector('.bankconnecttoken') as HTMLElement).style.display = 'none';
      (document.querySelector('.bankconnectmessage') as HTMLElement).style.display = 'block';
    } else {
      console.log('Entered token section');
      (document.querySelector('.bankconnect') as HTMLElement).style.display = 'block';
      (document.querySelector('.bankconnecttoken') as HTMLElement).style.display = 'block';
      (document.querySelector('.bankconnectmessage') as HTMLElement).style.display = 'none'; }
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.userrole') as HTMLElement).style.display = 'none';
    (document.querySelector('.registry') as HTMLElement).style.display = 'none';
    (document.querySelector('.security') as HTMLElement).style.display = 'none';

  }

  show_roles(){
    this.profileClass = {
      "buttons" : true,
      "options" : false
    };

    this.bankconnectClass = {
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

    this.securityClass = {
      "buttons" : true,
      "options" :false
    };

    this.title = "ASSIGN ROLES";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.security') as HTMLElement).style.display = 'none';
    (document.querySelector('.bankconnect') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.userrole') as HTMLElement).style.display = 'block';
    (document.querySelector('.registry') as HTMLElement).style.display = 'none';
  }

  show_pass(){
    this.profileClass = {
      "buttons" : true,
      "options" : false
    };

    this.bankconnectClass = {
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

    this.securityClass = {
      "buttons" : true,
      "options" :false
    };

    this.title = "CHANGE PASSWORD";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.bankconnect') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'block';
    (document.querySelector('.userrole') as HTMLElement).style.display = 'none';
    (document.querySelector('.security') as HTMLElement).style.display = 'none';
    (document.querySelector('.registry') as HTMLElement).style.display = 'none';
  }
  show_registry(){
    this.profileClass = {
      "buttons" : true,
      "options" : false
    };

    this.bankconnectClass = {
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

    this.securityClass = {
      "buttons" : true,
      "options" :false
    };

    this.title = "REGISTRY";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.bankconnect') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.userrole') as HTMLElement).style.display = 'none';
    (document.querySelector('.security') as HTMLElement).style.display = 'none';
    (document.querySelector('.registry') as HTMLElement).style.display = 'block';
  }
  show_security(){
    this.profileClass = {
      "buttons" : true,
      "options" : false
    };

    this.bankconnectClass = {
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
      "options" :false
    };

    this.securityClass={
      "buttons" : true,
      "options" : true
    }

    this.title = "REGISTRY";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.bankconnect') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.userrole') as HTMLElement).style.display = 'none';
    (document.querySelector('.registry') as HTMLElement).style.display = 'none';
    (document.querySelector('.security') as HTMLElement).style.display = 'block';

  }

  setSecurity(){
    this.router.navigateByUrl('/apisecurity');
  }
}

