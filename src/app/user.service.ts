import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class UserService {
  user: FirebaseAuthState;
  constructor(private af: AngularFire) {
    af.auth
      .do(v => console.log('onAuth', v))
      // .map(u => {
      //   return Object.assign({}, u, {
      //     auth: null // makes easier to convert to json
      //   })
      // })
      .subscribe(user => {
        this.user = user;
        console.log('user: ', this.user);
    });
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.af.auth.login({email: email, password: password})
      .then((user) => {console.log(`Anonymous Login Success:`, user); resolve(true); })
      .catch(e => {console.error(`Anonymous Login Failure:`, e); reject(e); });
    });
  }

  logout() {
    this.af.auth.logout();
  }

  register(name:string, email:string, password:string):Promise<void>{
    return new Promise<void>((resolve,reject)=>{
      this.af.auth.createUser({email: email,password: password})
      .then((user:FirebaseAuthState) => {
        this.af.database.object(`/users/${user.uid}`).set({name: name, email:email}).then(x => resolve()).catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }
  isEmailRegistered(email:string):Promise<boolean>{
    var observable: FirebaseListObservable<any[]>;
    observable = this.af.database.list('/users/', {
      query: {
        orderByChild: 'email',
        equalTo: email
      }
    });
    var subscription:Subscription;

    return new Promise<boolean>((resolve,reject)=>{
      var existing:boolean = false;
      subscription = observable.subscribe(users => {
        subscription.unsubscribe();
        resolve(users.length != 0);
      });
    });
  }
}
