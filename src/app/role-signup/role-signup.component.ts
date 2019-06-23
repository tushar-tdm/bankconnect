import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Banks } from '../domain/banks';
import { SignupServiceService} from '../services/signup-service.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-role-signup',
  templateUrl: './role-signup.component.html',
  styleUrls: ['./role-signup.component.scss']
})
export class RoleSignupComponent implements OnInit {

  sent:Number = 0;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private signservice: SignupServiceService, private route: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      //email:['',[Validators.required]],
      username:['',[Validators.required]],
      pass:['',[Validators.required]],
      fname:['',[Validators.required]],
      lname:['',[Validators.required]],
    });
  }

  onSubmit(){
    var myObj = {
      username: this.signupForm.controls.username.value,
      pass: this.signupForm.controls.pass.value,
      fname : this.signupForm.controls.fname.value,
      lname : this.signupForm.controls.lname.value,
    }

    this.signservice.sendRoleSignUpDetails(myObj)
  .subscribe(
    (data : any) => {
      console.log("data recieved after role signup: "+data);
      this.sent = 0;
      this.route.navigateByUrl('/profile');
    },
    (error: any) => console.log(error)
  );
  }
}
