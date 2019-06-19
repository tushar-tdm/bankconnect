import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  Image1: any = '../../assets/yesbank_carosel_1.png';
  Image2: any = '../../assets/yesbank_carosel_2.png';
  Image3: any = '../../assets/yesbank_carosel_3.png';

  initiation: Number = 0;

  images: Array<any> = [this.Image1, this.Image2, this.Image3];


  constructor(private signservice: SignupServiceService, private route: ActivatedRoute, config: NgbCarouselConfig, public router: Router,
              public location: Location ) {

    config.interval = 3000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = true;
    config.wrap = true;

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

  onInitiationSubmit(){
    this.initiation = 1;
    // window.location.reload();


    // this.router.navigateByUrl("/refresh", { skipLocationChange: true}).then(() => {
    //   this.router.navigate([decodeURI(this.location.path())]);
    // });

  }

}
