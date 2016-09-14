import { Component, OnInit } from '@angular/core';
import { Router    } from '@angular/router';

import { UserService, User } from '../shared/index';

interface RegisterData{
  name:string;
  email:string;
  password:string;
  password2:string;
}

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  model:RegisterData = {name:"",email:"",password:"",password2:""};
  active:boolean;
  constructor(private userService:UserService, private router:Router){ }

  onSubmit(){
    var user:User = {
      _id:null,
      name:this.model.name, 
      email:this.model.email,
      password:this.model.password
    };
    this.userService.register(user).then(user=>{
      console.log("oi");
      this.newUser();
    });
  }

  ngOnInit(){
    this.newUser();
  }

  newUser(){
    this.model = {name:"",email:"",password:"",password2:""};
    this.active = false;
    setTimeout(()=>this.active = true,0);
  }
}