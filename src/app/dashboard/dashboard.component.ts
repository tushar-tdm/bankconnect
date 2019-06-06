import { Component, OnInit } from '@angular/core';
import { SignupServiceService} from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  select_api : Array<String> = [];
  integrated : Number = 0;
  confirmed : Number = 0;
  bcintegrated : Number = 0;


  constructor(private signservice: SignupServiceService, private route: ActivatedRoute,private fb: FormBuilder) {
    this.select_api = this.route.snapshot.data['selected_api'];
    console.log(this.select_api);
  }

  ngOnInit() {

    this.signservice.confirmed()
    .subscribe((data) => {
      console.log('confirmed:'+data);
      this.confirmed = data;
    }, (err) => console.log(err));

    //make a call to service to know whether the confirmation is done or not.
    this.signservice.integrated()
    .subscribe((data) => {
      console.log('integrated:'+ data);
      this.integrated = data;
    }, (err) => console.log(err));

    this.signservice.checkbcintegrated()
    .subscribe((data) => {
      console.log('bcintegrated:' + data);
      this.bcintegrated = data;
    }, (err) => console.log(err));

}


  checkshell(){
    this.signservice.checkshell()
    .subscribe((data)=>{
      console.log(data);
    },(err)=> console.log(err));
  }
}
