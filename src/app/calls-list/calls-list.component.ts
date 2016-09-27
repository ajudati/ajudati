import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { CallService } from '../call.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-calls-list',
  templateUrl: './calls-list.component.html',
  styleUrls: ['./calls-list.component.scss']
})
export class CallsListComponent implements OnInit {

  currentCalls:FirebaseListObservable<any>;
  constructor(private cs:CallService, 
              private as:AuthService) { }

  ngOnInit() {
    this.currentCalls   = this.cs.getCalls(this.as.id);
  }

}
