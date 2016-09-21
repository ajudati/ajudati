import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private us: UserService, private router: Router) {

  }

  ngOnInit() {

  }

  logout() {
    this.us.logout();
    this.router.navigate(['/login']);
  }
}
