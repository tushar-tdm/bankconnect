import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../services/signup-service.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle = 'IDBP';

  constructor( private signservice: SignupServiceService ) { }

  ngOnInit() {
  }

}
