import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2';

import { CallService } from '../call.service';
import { UserService } from '../user.service';
import { ProfileService } from '../profile.service';
import { AuthService } from '../auth.service';
import { Call, ICall } from '../call';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  currentCall:FirebaseObjectObservable<ICall>;
  call:ICall;
  users:Object;
  editing:boolean;
  pictures:Object;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private us:UserService,
    private ps:ProfileService,
    private as:AuthService,
    private cs:CallService) {
     this.users = {}; 
     this.pictures = {};
     this.call = new Call();
     this.editing = false;
     
   }

  ngOnInit() {
    this.editing = false;
    this.route.params.forEach((params: Params) =>{
      this.call.$key = params['id'];
      this.currentCall = this.cs.getCall(this.call.$key);
      this.currentCall.subscribe((call:ICall)=>{
        this.call = call;
        if(!this.users.hasOwnProperty(call.owner)){
          this.users[call.owner] = this.us.getUser(call.owner);
          this.pictures[call.owner] = this.ps.getPicture(call.owner);
        }
        if(call.helper && call.helper != "" && !this.users.hasOwnProperty(call.helper)){
          this.users[call.helper] = this.us.getUser(call.helper);
          this.pictures[call.helper] = this.ps.getPicture(call.helper);
        }
      });
    });
  }
  onHelperSearchClicked(){
    this.router.navigate(['helpersearch']);
  }
  onEditClicked(){
    this.editing = true;
  }
  onFinishClicked(){
    this.cs.finishCall(this.call.$key);
  }
  onRemoveClicked(){
    this.cs.removeCall(this.call.$key);
  }
  onBeHelperClicked(){
    this.cs.helpCall(this.call.$key);
  }
  onAcceptedClicked(){
    this.cs.acceptCall(this.call.$key);
  }
  onRejectedClicked(){
    this.cs.rejectCall(this.call.$key);
  }
  get uid(){
    return this.as.id;
  }
}
