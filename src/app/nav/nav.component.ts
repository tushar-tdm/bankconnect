import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../services/signup-service.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle = 'IDBP';
  login : Number = 0;
  username: string ='';
  profileLink :string =  "/profile";
  bank: string = '';
  logo: any = '../../assets/Yes_Bank_logo.png';

  constructor( private signservice: SignupServiceService, private router: Router, public  location: Location ) { }

  ngOnInit() {
    this.signservice.checkLogin()
    .subscribe((data) => {
      console.log(data);
      if(data === 0) {
        this.login = data;
      } else {this.username = data;
              this.login = 1; }
    }, (err) => console.log(err));

    // this.signservice.getUserType()
    // .subscribe((data)=>{
    //   if(data == "admin")
    //     this.profileLink = "/profile";
    //   else if(data == "business")
    //     this.profileLink = "/bmprofile";
    //   else if(data == "product")
    //     this.profileLink = "/pmprofile";
    //   else
    //     this.profileLink = "/amprofile";
    // })
  }

  onLogout(){
    this.signservice.logout()
    .subscribe((data) => {
      console.log(data)
      this.bank = data;
      this.login = 0;
      window.location.href = 'http://idbpportal.bank.com:3000/login';
    }, (err) => console.log(err));
    return true;
  }

}
