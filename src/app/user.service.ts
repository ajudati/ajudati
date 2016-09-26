import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable, Subscription } from 'rxjs';

/**
 * @brief      Class for user service.
 */
@Injectable()
export class UserService {
  user: FirebaseAuthState;

  /**
   * { item_description }
   */
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

  /**
   * @brief      { function_description }
   *
   * @param      name      The name
   * @param      email     The email
   * @param      password  The password
   *
   * @return     { description_of_the_return_value }
   */
  register(name:string, email:string, password:string):Promise<string>{
    return new Promise<string>((resolve,reject)=>{
      this.af.auth.createUser({email: email,password: password})
      .then((user:FirebaseAuthState) => {
        this.af.database.object(`/users/${user.uid}`).set({name: name, email:email}).then(x => resolve(user.uid)).catch(err => reject(err));
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

  getUser(uid: string):FirebaseObjectObservable<any>{
    return this.af.database.object(`users/${uid}`);
  }
}
