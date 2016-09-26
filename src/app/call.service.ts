import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Call } from './call';

@Injectable()
export class CallService {

  currentCall:Call;

  constructor(private af:AngularFire) {
    this.currentCall = null;
  }

  createCall(call:Call): firebase.Promise<any>{
    return this.af.database.list(`calls`).push(call);
  }


  getCalls(uid:string):FirebaseListObservable<any>{
    return this.af.database.list('calls',{
      query:{
        orderByChild: 'owner',
        equalTo: uid
      }
    });
  }
}
