import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  titles = {
    'login': 'Entrar',
    'register': 'Cadastrar',
    'Profile': 'Perfil'
  };
  hasBack: boolean = false;

  constructor(private router: Router) { }

  get title() {
    return this.titles[this.router.url];
  }
}
