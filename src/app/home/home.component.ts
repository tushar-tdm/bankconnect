import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  Image1: any = '../../assets/ibm1.jpg';
  Image2: any = '../../assets/ibm.jpg';
  Image3: any = '../../assets/carosel4.jpg';

  images: Array<any> = [this.Image1, this.Image2, this.Image3];


  constructor(private signservice: SignupServiceService, private route: ActivatedRoute, config: NgbCarouselConfig) {

    config.interval = 3000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = true;
    config.wrap = true;

    this.route.params.subscribe( params => {
      console.log(params);
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
