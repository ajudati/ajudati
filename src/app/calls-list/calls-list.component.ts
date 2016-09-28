import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { CallService } from '../call.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Call, ICall } from '../call';

@Component({
  selector: 'app-calls-list',
  templateUrl: './calls-list.component.html',
  styleUrls: ['./calls-list.component.scss']
})
export class CallsListComponent implements OnInit {

  currentCalls:FirebaseListObservable<any>;
  currentServices:FirebaseListObservable<any>;
  users:Object;
  viewFinished:boolean;
  constructor(private cs:CallService, 
              private us:UserService,
              private as:AuthService,
              private route:Router) { 
    this.users = {};
    this.viewFinished = true;
  }

  ngOnInit() {
    this.users = {};
    this.currentCalls   = this.cs.getCalls(this.as.id);
    this.currentServices= this.cs.getServices(this.as.id);
    this.currentCalls.subscribe(calls => {
      let call = calls[0];
      if(call && call.helper && !this.users.hasOwnProperty(call.helper)){
        this.users[call.helper] = this.us.getUser(call.helper);
      }
    });
    this.currentServices.subscribe(services => {
      let service = services[0];
      if(service && !this.users.hasOwnProperty(service.owner)){
        this.users[service.owner] = this.us.getUser(service.owner);
      }
    });
  }
  onCheck(id:string){
    this.cs.finishCall(id);
  }
  onRemove(id:string){
    this.cs.removeCall(id);
  }
  onCallSelected(call:ICall){
    this.route.navigate(['call',call.$key]);
  }
}
