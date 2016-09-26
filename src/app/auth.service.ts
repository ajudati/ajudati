import { Injectable } from '@angular/core';
import { AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthService {
  private authState:FirebaseAuthState = null;
  constructor(private auth$: FirebaseAuth) { 
    auth$.subscribe((state:FirebaseAuthState)=>{
      this.authState = state;
    });
  }

  get authenticated():boolean{
    return this.authState != null;
  }

  get id():string{
    return this.authenticated?this.authState.uid:'';
  }

  signIn(provider:any):firebase.Promise<FirebaseAuthState>{
    return this.auth$.login(provider)
      .catch(error=>console.error('Erro @AuthService#signIn(): ', error));
  }

  signInSocial(provider:number):firebase.Promise<FirebaseAuthState>{
    return this.signIn({provider:provider, method:AuthMethods.Popup});
  }
  signInWithPassword(email: string, password: string):firebase.Promise<FirebaseAuthState>{
    return this.signIn({email: email, password: password});
  }
  signInWithGithub():firebase.Promise<FirebaseAuthState>{
    return this.signInSocial(AuthProviders.Github);
  }
  signInWithFacebook():firebase.Promise<FirebaseAuthState>{
    return this.signInSocial(AuthProviders.Facebook);
  }
  signInWithTwitter():firebase.Promise<FirebaseAuthState>{
    return this.signInSocial(AuthProviders.Twitter);
  }
  signInWithGoogle():firebase.Promise<FirebaseAuthState>{
    return this.signInSocial(AuthProviders.Google);
  }
  signOut(){
    this.auth$.logout();
  }
  canActivate():Observable<boolean>{
    return this.auth$
      .take(1)
      .map(authState => !!authState);
  }
}
