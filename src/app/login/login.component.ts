import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = {email: '', password: ''};
  hasError: boolean;

  constructor(private auth:AuthService, private router: Router) {  }

  ngOnInit() {
    this.hasError = false;
  }

  signInWithGithub():void{
    this.auth.signInWithGithub().then(()=>this.postSignIn());
  }
  signInWithFacebook():void{
    this.auth.signInWithFacebook().then(()=>this.postSignIn());
  }
  signInWithTwitter():void{
    this.auth.signInWithTwitter().then(()=>this.postSignIn());
  }
  signInWithGoogle():void{
    this.auth.signInWithGoogle().then(()=>this.postSignIn());
  }

  postSignIn():void{
    this.router.navigate(['/callslist']);
  }

  onSubmit() {
    this.auth.signInWithPassword(this.model.email, this.model.password).then(()=>this.postSignIn());
  }
  clearFields(){
    this.model = {email: '', password: ''};
  }
}
