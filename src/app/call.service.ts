import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Call, ICall } from './call';
import { CallStatus } from './call-status.enum';

@Injectable()
export class CallService {

  currentCall:Call;
  calls:FirebaseListObservable<ICall[]>;

  constructor(private af:AngularFire) {
    this.currentCall = null;
    this.calls = this.af.database.list(`calls`);
  }

  // owner functions
  createCall(call:Call): PromiseLike<any>{
    return this.calls.push(call);
  }
  updateCall(id:string, change:any): PromiseLike<void>{
    return this.calls.update(id, change);
  }
  removeCall(id:string): PromiseLike<void>{
    return this.calls.remove(id);
  }
  addHelper(id:string, uid:string): PromiseLike<void>{
    return this.calls.update(id,{
      helper:uid,
      status:CallStatus.Accepting, 
      ownerAccepted:true, 
      ownerAcceptedAt:firebase.database['ServerValue']['TIMESTAMP']});
  }
  acceptHelper(id:string): PromiseLike<void>{
    return this.calls.update(id,{
      status: CallStatus.Accepted,
      ownerAccepted:true, 
      ownerAcceptedAt: firebase.database['ServerValue']['TIMESTAMP']});
  }
  rejectHelper(id:string): PromiseLike<void>{
    return this.calls.update(id,{
      status: CallStatus.New, 
      helperAccepted:false,
      helper:null});
  }
  finishCall(id:string): PromiseLike<void>{
    return this.calls.update(id,{
      status:CallStatus.Finished, 
      finishedAt:firebase.database['ServerValue']['TIMESTAMP'], 
      viewed: true});
  }
  getCalls(uid:string):FirebaseListObservable<any>{
    return this.af.database.list('calls',{
      query:{
        orderByChild: 'owner',
        equalTo: uid
      }
    });
  }

  // helper functions
  acceptCall(id:string): PromiseLike<void>{
    return this.calls.update(id,{
      status: CallStatus.Accepted,
      helperAccepted: true, 
      helperAcceptedAt: firebase.database['ServerValue']['TIMESTAMP']});
  }
  rejectCall(id:string): PromiseLike<void>{
    return this.calls.update(id,{
      status: CallStatus.New,
      ownerAccepted:false, 
      helper: null});
  }
  helpCall(id:string): PromiseLike<void>{
    return this.calls.update(id,{
      helper:id, 
      status: CallStatus.Accepting,
      helperAccepted:true});
  }
  getServices(uid:string):FirebaseListObservable<any>{
    return this.af.database.list('calls',{
      query:{
        orderByChild: 'helper',
        equalTo: uid
      }
    });
  }
  getCall(id:string):FirebaseObjectObservable<any>{
    return this.af.database.object(`calls/${id}`);
  }
}
