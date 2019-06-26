import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../services/signup-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  Email:any;
  Org:any;

  constructor(private signservice: SignupServiceService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
      console.log("here:->"+params['email']);
      var obj = {
        email : params['email'],
        org : params['org']
      }
      this.Email = params['email'];
      this.Org = params['org'];

    });
  }

  ngOnInit() {   
  }

  accept(){
    var myObj = {
      email: this.Email,
      status: true,
      org : this.Org
    }
    this.signservice.setPartner(myObj)
    .subscribe((data)=>console.log(data),(err)=>console.log(err));

    this.router.navigateByUrl('/bmprofile');
  }

  decline(){
    var myObj = {
      user: this.Email,
      status: false,
      org : this.Org
    }
    this.signservice.setPartner(myObj)
    .subscribe((data)=>console.log(data),(err)=>console.log(err));

    this.router.navigateByUrl('/bmprofile');
  }

}
