import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user  = {name: 'Fulano da Silva'};
  calls = [
    {title: 'Meu computador quebrou'},
    {title: 'Minha impressora não funciona'},
    {title: 'O monitor não quer ligar'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
