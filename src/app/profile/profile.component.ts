import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupServiceService} from '../services/signup-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  signupForm: FormGroup;

// tslint:disable-next-line: variable-name
  show_user_profile: Array<String> = [];

  constructor(private signservice: SignupServiceService, private route: ActivatedRoute) {
    this.show_user_profile = this.route.snapshot.data['user_profile'];
    console.log(this.show_user_profile);
  }

  ngOnInit(){

  }


}

