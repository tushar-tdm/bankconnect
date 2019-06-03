import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../services/signup-service.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle = 'IDBP';
  login : Number = 0;
  username: string ='';

  constructor( private signservice: SignupServiceService ) { }

  ngOnInit() {
    this.signservice.checkLogin()
    .subscribe((data) => {
      console.log(data);
      if(data === 0) {
        this.login = data;
      } else {this.username = data;
              this.login = 1; }
    }, (err) => console.log(err));
  }

}
