import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  titles = {
    'login':    'Entrar',
    'register': 'Cadastrar',
    'profile':  'Perfil',
    'callform':  'Adicionar Chamado',
    'callslist':  'Chamados',
    'settings':  'Configurações',
    'call':  'Chamado',
    'callssearch':  'Procurar Serviço',
    'helpersearch': 'Escolha o seu Ajudante',
    'chat' : 'Chat'
  };
  hasBack: boolean = false;

  constructor(private as:AuthService, 
              private us:UserService,
              private ps:ProfileService,
	      private chatService: ChatService,
              private router: Router) { }

  get title(): string {
    return this.titles[this.router.url.split('/')[1]];
  }

  get authenticated(): boolean {
    return this.as.authenticated;
  }

  get uid(): string {
    return this.as.id;
  }

  signOut(): void {
    this.as.signOut();
    this.router.navigate(['/callform']);
  }
}
