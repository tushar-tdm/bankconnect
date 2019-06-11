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

    // this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {
    //   console.log('navigation occured');
    //   console.log([decodeURI(this.location.path())]);
    //   this.router.navigate([decodeURI(this.location.path())]);
    // });
  }

  onLogout(){
    this.signservice.logout()
    .subscribe((data) => {
      console.log(data);
    }, (err) => console.log(err));
    return true;
  }

}
