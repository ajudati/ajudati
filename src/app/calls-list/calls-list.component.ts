import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import { CallService } from '../call.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { ProfileService } from '../profile.service';
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
  searching:boolean;
  pictures:Object;
  constructor(private cs:CallService, 
              private us:UserService,
              private as:AuthService,
              private ps:ProfileService,
              private route:Router) { 
    this.users = {};
    this.pictures = {};
    this.viewFinished = true;
  }

  sortCalls(calls){
    calls.sort((a,b)=>a.finished-b.finished);
    return calls;
  }

  ngOnInit() {
    this.searching = false;
    this.users = {};
    this.currentCalls   = <FirebaseListObservable<any>>this.cs.getCalls(this.as.id).do(this.sortCalls);
    this.currentServices= <FirebaseListObservable<any>>this.cs.getServices(this.as.id).do(this.sortCalls);
    this.currentCalls.subscribe(calls => {
      calls.forEach(call=>{
        if(call && call.helper && !this.users.hasOwnProperty(call.helper)){
          this.users[call.helper] = this.us.getUser(call.helper);
          this.pictures[call.helper] = this.ps.getPicture(call.helper);
        }
      });
    });
    
    this.currentServices.subscribe(services => {
      services.forEach(service=>{
        if(service && !this.users.hasOwnProperty(service.owner)){
          this.users[service.owner] = this.us.getUser(service.owner);
          this.pictures[service.owner] = this.ps.getPicture(service.owner);
        }
      });      
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
  onAddServiceClicked(){
    this.route.navigate(['callssearch']);
    //this.searching = true;
  }
  onRejectHelperClicked(service:ICall){
    this.cs.rejectHelper(service.$key);
  }
  onAcceptHelperClicked(service:ICall){
    this.cs.acceptHelper(service.$key);
  }
}
