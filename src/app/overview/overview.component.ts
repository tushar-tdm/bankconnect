import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  apiname:string;
  name = "default";
  desc = "default";
  key_features = "defailt";
  use_cases = "default";
  apiDetails: any;
  x: any;

  constructor(private ActivatedRoute: ActivatedRoute,private apiservice : ApiserviceService) {
    this.apiDetails = this.ActivatedRoute.snapshot.data['apiDetails'];
    this.x = JSON.stringify(this.apiDetails);
    this.name = this.apiDetails.name;
    this.desc = this.apiDetails.desc;
    this.key_features = this.apiDetails.key_features;
    this.use_cases = this.apiDetails.use_cases;
    console.log("this is the api details got from resolver: "+this.apiDetails.key_features);

   }

  ngOnInit() {
  }

}
