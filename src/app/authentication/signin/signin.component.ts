import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm:FormGroup;

  constructor(
    private FB: FormBuilder,
    private router :Router) { 

    }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.signInForm = this.FB.group({
      email: ['', Validators.required],
      password: ['', Validators.required]

    })
  }

  onSubmit(){
    
  }
}
