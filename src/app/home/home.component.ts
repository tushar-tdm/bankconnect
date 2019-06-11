import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Image1: any = '../../assets/ibm1.jpg';
  Image2: any = '../../assets/ibm.jpg';
  Image3: any = '../../assets/carosel4.jpg';


  constructor(private signservice:SignupServiceService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      console.log("here:->"+params['bankname']);
      var obj = {
        bank : params['bankname']
      }
      this.signservice.setBank(obj)
      .subscribe((data)=>{
        console.log("data is :"+data);
      },(err)=> console.log(err));
    });
   }

  ngOnInit() {
  }
}
