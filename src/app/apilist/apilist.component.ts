import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-apilist',
  templateUrl: './apilist.component.html',
  styleUrls: ['./apilist.component.scss']
})
export class ApilistComponent implements OnInit {

  apilist: Array<String> = [];

  constructor(private router: Router,private route: ActivatedRoute,private apiservice : ApiserviceService) { 
    this.apilist = this.route.snapshot.data['apiList'];
    console.log("this is the apilist: "+this.apilist);
  }

  ngOnInit() {
  }

  // setApi(apiname){
  //   this.router.navigate(['/overview'],{queryParams:{apiname:`${apiname}`}});
  // }

  setApi(apiname){
    this.apiservice.setApi(apiname);
    this.router.navigateByUrl('/overview');
  }
}
