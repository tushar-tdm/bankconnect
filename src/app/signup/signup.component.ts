import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Banks } from '../domain/banks';
import { SignupServiceService} from '../services/signup-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  sent:Number = 0;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private signservice: SignupServiceService ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email:['',[Validators.required]],
      username:['',[Validators.required]],
      pass:['',[Validators.required]],
      fname:['',[Validators.required]],
      lname:['',[Validators.required]],
      admin:['',[Validators.required]],
    });
  }

  onSubmit(){
    var myObj = {
      email: this.signupForm.controls.email.value,
      username: this.signupForm.controls.username.value,
      pass: this.signupForm.controls.pass.value,
      fname : this.signupForm.controls.fname.value,
      lname : this.signupForm.controls.lname.value,
      admin : this.signupForm.controls.admin.value
    }
    
    this.signservice.sendSignUpDetails(myObj)
  .subscribe(
    (data : any) => {
      console.log(data);
      this.sent = 1;
    },
    (error: any) => console.log('error')
  );
  }
}
