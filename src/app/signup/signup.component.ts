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

  allBanks: Banks[];
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private signservice: SignupServiceService ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email:['',[Validators.required]],
      username:['',[Validators.required]],
      bank:['null',[Validators.required]],
      pass:['',[Validators.required]]
    });
    this.allBanks = this.signservice.getallBanks();
  }

  onSubmit(){
    var myObj = {
      email: this.signupForm.controls.email.value,
      username: this.signupForm.controls.username.value,
      bank: this.signupForm.controls.bank.value.bankName,
      pass: this.signupForm.controls.pass.value
    }
    // var bankval = JSON.stringify(this.signupForm.controls.bank.value);
    // console.log('display' + bankval);
    
    this.signservice.sendSignUpDetails(myObj)
  .subscribe(
    (data : any) => {
      console.log(data);
      alert("Email has been sent. Please verify your email to continue");
    },
    (error: any) => console.log('error')
  );
  }
}
