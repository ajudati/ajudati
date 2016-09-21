import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model = {
    name: '',
    email: '',
    password: '',
    password2: ''
  };
  err:string;
  constructor(private us: UserService, private router:Router) { }

  ngOnInit() {
    this.err = '';
  }

  onSubmit(){
    this.us.register(this.model.name, this.model.email, this.model.password).then(() => {
      this.router.navigate(['/login']);
    }).catch(err => {
      this.err = err;
    });
  }
}
