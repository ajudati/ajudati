import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Call, ICall } from './call';

@Injectable()
export class CallService {

  currentCall:Call;
  calls:FirebaseListObservable<ICall[]>;

  constructor(private af:AngularFire) {
    this.currentCall = null;
    this.calls = this.af.database.list(`calls`);
  }

  createCall(call:Call): firebase.Promise<any>{
    console.log(call);
    return this.calls.push(call);
  }

  removeCall(id:string){
    this.calls.remove(id);
  }

  finishCall(id:string){
    this.calls.update(id,{finished:true, finishedOn:firebase.database['ServerValue']['TIMESTAMP'], viewed: true});
  }
  acceptCall(id:string){
    this.calls.update(id,{accepted:true, acceptedOn: firebase.database['ServerValue']['TIMESTAMP'], viewer: true});
  }
  rejectCall(id:string){
    this.calls.update(id,{accepted:false, helper:null, acceptedOn: firebase.database['ServerValue']['TIMESTAMP'], viewer: false});
  }


  getCalls(uid:string):FirebaseListObservable<any>{
    return this.af.database.list('calls',{
      query:{
        orderByChild: 'owner',
        equalTo: uid
      }
    });
  }
  getServices(uid:string):FirebaseListObservable<any>{
    return this.af.database.list('calls',{
      query:{
        orderByChild: 'helper',
        equalTo: uid
      }
    });
  }
}
