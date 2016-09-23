import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
@Injectable()
export class CallService {

  constructor(private af:AngularFire) { }

  getCalls(uid:string):FirebaseListObservable<any>{
    return this.af.database.list('calls',{
      query:{
        orderByChild: 'owner',
        equalTo: uid
      }
    });
  }
}
