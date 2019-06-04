import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apilist',
  templateUrl: './apilist.component.html',
  styleUrls: ['./apilist.component.scss']
})
export class ApilistComponent implements OnInit {

  apilist: Array<String> = [];

  constructor(private router: Router,private route: ActivatedRoute) { 
    this.apilist = this.route.snapshot.data['apiList'];
    console.log("this is the apilist: "+this.apilist);
  }

  ngOnInit() {
  }

}