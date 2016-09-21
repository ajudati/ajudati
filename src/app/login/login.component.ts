import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = {email: '', password: ''};
  hasError: boolean;

  constructor(private us: UserService, private router: Router) {  }

  ngOnInit() {
    this.hasError = false;
  }
  onSubmit() {
    this.us.login(this.model.email, this.model.password).then(logged => {
      this.router.navigate(['/callform']);
    }).catch(e => {
      this.hasError = true;
    });
  }
}
