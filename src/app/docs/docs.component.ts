import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../services/signup-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  Image1:any;
  Image2:any;
  Email:any;
  Org:any;

  constructor(private signservice: SignupServiceService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
      console.log("here:->"+params['email']);
      var obj = {
        email : params['email']
      }
      this.Email = params['email'];
      this.Org = params['org'];

      this.signservice.setDocs(obj)
      .subscribe((data)=>{
        console.log(data)
        this.Image1 = '../../assets/docs/aadhaar.jpg';
        this.Image2 = '../../assets/docs/pan.jpg'
      },(err)=>console.log(err));
    });
  }

  ngOnInit() {
  }

  accept(){
    var myObj = {
      email: this.Email,
      status: true,
      org : this.Org
    }
    this.signservice.setPartner(myObj)
    .subscribe((data)=>console.log(data),(err)=>console.log(err));

    this.router.navigateByUrl('/bmprofile');
  }

  decline(){
    var myObj = {
      user: this.Email,
      status: false,
      org : this.Org
    }
    this.signservice.setPartner(myObj)
    .subscribe((data)=>console.log(data),(err)=>console.log(err));

    this.router.navigateByUrl('/bmprofile');
  }

}
