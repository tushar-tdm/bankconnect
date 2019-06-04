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
  apiDetails: any;

  constructor(private ActivatedRoute: ActivatedRoute,private apiservice : ApiserviceService) {
    this.apiDetails = this.ActivatedRoute.snapshot.data['apiDetails'];
    var x = JSON.stringify(this.apiDetails);
    console.log("this is the api details got from resolver: "+this.apiDetails.key);
   }

  ngOnInit() {
  }

}
