import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupServiceService} from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-bmprofile',
  templateUrl: './bmprofile.component.html',
  styleUrls: ['./bmprofile.component.scss']
})
export class BmprofileComponent implements OnInit {
  roleForm: FormGroup;
  passForm : FormGroup;
  rulesForm: FormGroup;

  title = "PROFILE";
  profile=0;pass=0;pending=1;

  profileClass = {
    "buttons" : true,
    "options" : false
  };

  pendingClass = {
    "buttons" : true,
    "options" : true
  };

  pendingDocs = {
    "buttons" : true,
    "options" : false
  }

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
  partners: any;
  docs: any;
  public submitted = false;

  constructor(private signservice: SignupServiceService, private route: ActivatedRoute, private formBuilder: FormBuilder,
              private router: Router, public location: Location) {
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

    this.signservice.getPartnerPaymentRulesDetails()
    .subscribe((data)=>{
      console.log(data);
      this.partners = data;
    },(err)=>console.log(err));

    this.signservice.getPendingDocs()
    .subscribe((data)=>{
      console.log(data);
      this.docs = data;
    },(err)=>console.log(err));

    this.rulesForm = this.formBuilder.group({
      amnt : ['', [Validators.required, Validators]],
      freq : ['', [Validators.required, Validators]],
      accno : ['', [Validators.required, Validators]],
      mid : ['', [Validators.required, Validators]],
      appid : ['', [Validators.required, Validators]],
      cid : ['', [Validators.required, Validators]],
    });

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

    this.pendingDocs = {
      "buttons" : true,
      "options" : false
    }


    this.title = "PROFILE";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'block';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.pendingreq') as HTMLElement).style.display = 'none';
    (document.querySelector('.partner') as HTMLElement).style.display = 'none';
    (document.querySelector('.docs') as HTMLElement).style.display = 'none';
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

    this.pendingDocs = {
      "buttons" : true,
      "options" : false
    }

    this.title = "CHANGE PASSWORD";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'block';
    (document.querySelector('.pendingreq') as HTMLElement).style.display = 'none';
    (document.querySelector('.partner') as HTMLElement).style.display = 'none';
    (document.querySelector('.docs') as HTMLElement).style.display = 'none';
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

    this.pendingDocs = {
      "buttons" : true,
      "options" : false
    }

    this.title = "Pending Requests";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.pendingreq') as HTMLElement).style.display = 'block';
    (document.querySelector('.partner') as HTMLElement).style.display = 'none';
    (document.querySelector('.docs') as HTMLElement).style.display = 'none';
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

    this.pendingDocs = {
      "buttons" : true,
      "options" : false
    }

    this.title = "OUR PARTNERS";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.pendingreq') as HTMLElement).style.display = 'none';
    (document.querySelector('.partner') as HTMLElement).style.display = 'block';
    (document.querySelector('.docs') as HTMLElement).style.display = 'none';
  }

  show_docs(){
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
      "options" : false
    }

    this.pendingDocs = {
      "buttons" : true,
      "options" : true
    }

    this.title = "PENDING DOCUMENTS";
    //show this and hide other divisions
    (document.querySelector('.profile') as HTMLElement).style.display = 'none';
    (document.querySelector('.changepass') as HTMLElement).style.display = 'none';
    (document.querySelector('.pendingreq') as HTMLElement).style.display = 'none';
    (document.querySelector('.partner') as HTMLElement).style.display = 'none';
    (document.querySelector('.docs') as HTMLElement).style.display = 'block';
  }

  accept(i,name,email,via){
    //i is the request number.
    //remove the request from pending and send a mail.
    var myObj = {
      id : i,
      state : true, //false if declined
      name : name,
      email: email
    }
    if(via == "client"){
      //get the images from the db
      this.signservice.getFilesClient(myObj)
      .subscribe((data)=>{
        //the data has an array of files in 'data.files'
        //get the length of the array and store it in db.
        this.signservice.storeFilesClient(data)
        .subscribe((data)=>{
          console.log(data);
          
          
          //he should be able to see the docs. or he should be added to the pending docs.
          this.signservice.addPendingDocs(myObj)
          .subscribe((data)=>{
            console.log(data);
          },(err)=>console.log(err)); 
          
        },(err)=>console.log(err)); 
      },(err)=>console.log(err));

    }else if(via == "partner"){
      //know the type of the request
      this.signservice.pendingReq(myObj)
      .subscribe((data)=>{ console.log(data);}
      ,(err)=> console.log(err));

      this.router.navigateByUrl('/refresh', { skipLocationChange: true}).then(() => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
    }
    
  }

  decline(i,name,email){
    var myObj = {
      id : i,
      state : false,
      name : name,
      email: email
    }
    this.signservice.pendingReq(myObj)
    .subscribe((data)=>{ console.log(data);}
    ,(err)=> console.log(err));

    this.router.navigateByUrl('/refresh', { skipLocationChange: true}).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  view_docs(email,org){
    //this.router.navigateByUrl(`/docs/${email}/${org}`);
    var myObj = {
      email : email,
      org : org
    }
    this.signservice.setDocs(myObj)
    .subscribe((data)=>{
      console.log(data);
    },(err)=>console.log(err));

    window.location.href=`http://idbpportal.bank.com:3000/route/showDocs/${email}/${org}`;
  }

  onRulesSubmit(email, org) {
    var myObj = {
      amnt : this.rulesForm.controls.amnt.value,
      freq : this.rulesForm.controls.freq.value,
      accno : this.rulesForm.controls.accno.value,
      mid : this.rulesForm.controls.mid.value,
      appid : this.rulesForm.controls.appid.value,
      cid : this.rulesForm.controls.cid.value,
      email: email,
      org: org
    };

    // to backend
    this.signservice.sendPaymentRulesDetails(myObj)
    .subscribe(
    (data : any) => {
      console.log(data);
    },
    (error: any) => console.log('error'));

    //to partner
    this.signservice.sendPaymentRulesDetailstoPartner(myObj)
    .subscribe(
    (data : any) => {
      console.log(data);
    },
    (error: any) => console.log('error'));

    //to display submit action completed
    this.submitted = true;
   //wait 3 Seconds and hide
    setTimeout(function() {
       this.submitted = false;
       console.log(this.submitted);
    }.bind(this), 3000);

  }


}
