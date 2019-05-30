import { Component, OnInit } from '@angular/core';
import { SignupServiceService} from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  select_api : Array<String> = [];

  constructor(private signservice: SignupServiceService, private route: ActivatedRoute) { 
    this.select_api = this.route.snapshot.data['selected_api'];
    console.log(this.select_api);
  }

  ngOnInit() {
  }
}
