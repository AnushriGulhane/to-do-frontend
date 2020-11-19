import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm:FormGroup;
  hide = true;
  
  constructor(
    private FB: FormBuilder,
    private router :Router,
    private api:ApiService,
    private auth:AuthService
    ) { 

    }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.signInForm = this.FB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    })
  }

  onSubmit(){
    if(this.signInForm.valid){
      this.api.post(`/authenticate`,this.signInForm.value).subscribe(
     (res:any)=>{
        console.log(res)
        this.auth.storeJwtToken(res.jwtToken);
        this.router.navigate(['/tasks/task']);
     },
     (err)=>{
       console.log(err)
     })
   }
  //  console.log("Form values not valid",this.signInForm.value)
  
  }
}
