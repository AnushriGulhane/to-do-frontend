import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm:FormGroup;
  hide = true;
  
  constructor(
    private FB: FormBuilder,
    private router :Router,
    private api:ApiService,
    ) { 

    }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.signUpForm = this.FB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    })
  }

  onSubmit(){
    if(this.signUpForm.valid){
       this.api.post(`/register`,this.signUpForm.value).subscribe(
      (res:any)=>{
        console.log(res)
      },
      (err)=>{
        console.log(err)
      })
    }
    console.log("Form values not valid",this.signUpForm.value)
   
  }

}
