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
  integrated : Number = 0;

  constructor(private signservice: SignupServiceService, private route: ActivatedRoute) { 
    this.select_api = this.route.snapshot.data['selected_api'];
    console.log(this.select_api);
  }

  ngOnInit() {
    //make a call to service to know whether the confirmation is done or not.
    this.signservice.integrated()
    .subscribe((data)=>{
      console.log(data);
      this.integrated = data;
    },(err)=> console.log(err));
  }
}
