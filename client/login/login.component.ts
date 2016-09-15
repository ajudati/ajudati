import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';

import { UserService       } from '../shared/index';
import { LoginData         } from './login.data';

@Component({
  moduleId: module.id,
  templateUrl:'login.component.html'
})
export class LoginComponent implements OnInit{
  model:LoginData = {email:"",password:""};
  hasError:boolean;

  constructor(
    private userService:UserService, 
    private router:Router){ }

  ngOnInit(){
    this.hasError = false;
    this.userService.logout();
  }

  // Called when submit button is clicked
  onSubmit(){
    this.userService
      .login(this.model.email, this.model.password)
      .subscribe(result => {
        if(result === true){
          this.hasError = false;
          this.router.navigate(['/dashboard']);
        }
        else{
          this.hasError = true;
        }
      });
  }
}