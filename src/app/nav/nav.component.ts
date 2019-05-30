import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../services/signup-service.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle = 'IDBP';
  integrated = 0;

  constructor( private signservice: SignupServiceService ) { }

  ngOnInit() {
    this.signservice.integrated()
    .subscribe((data)=>{
      console.log("nav.ts. the data is: "+data);
      this.integrated = data;
    });
  }

}
