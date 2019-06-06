import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../services/signup-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private signservice:SignupServiceService) { }

  ngOnInit() {
  }
}
