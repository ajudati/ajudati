import { Component } from '@angular/core';

@Component({
  selector: 'ajudatiapp',
  template: `
    <nav class="navbar navbar-light bg-faded">
      <ul class="nav navbar-nav">
        <li class="nav-item"><a class="nav-link" routerLink="/login" [routerLinkActive]="['active']">Login</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="/register" [routerLinkActive]="['active']">Cadastrar</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }