import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

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

  sortCalls(calls){
    calls.sort((a,b)=>a.finished-b.finished);
    return calls;
  }

  ngOnInit() {
    this.users = {};
    this.currentCalls   = <FirebaseListObservable<any>>this.cs.getCalls(this.as.id).do(this.sortCalls);
    this.currentServices= <FirebaseListObservable<any>>this.cs.getServices(this.as.id).do(this.sortCalls);
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
  onServiceAccepted(service:ICall){
    this.cs.acceptCall(service.$key);
  }
  onServiceRejected(service:ICall){
    this.cs.rejectCall(service.$key);
  }
}
