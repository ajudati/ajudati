import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private currentSection:number;

  @Output() signOut: EventEmitter<void>;
  @Output() profileClicked: EventEmitter<void>;
  @Output() settingsClicked: EventEmitter<void>;
  @Output() callsListClicked: EventEmitter<void>;
  @Input()  authenticated:boolean;
  @Input()  uid:string;

  constructor() {
    this.signOut = new EventEmitter<void>(false);
  }

  ngOnInit() {

  }

  set active(section:number){
    this.currentSection = section;
  }
}
