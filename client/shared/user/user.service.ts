import { Injectable              } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable              } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { User       }    from './user';

@Injectable()
export class UserService{
  _token:string;
  constructor(private http: Http){ }

  get token():string{return this._token;}

  register(user:User):Promise<User>{
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    return this.http
      .post('/api/user', JSON.stringify(user), {headers:headers})
      .toPromise()
      .then(res=>res.json().data)
      .catch(this.handleError);
  }
  login(id:string, password:string):Observable<boolean>{
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/api/login', JSON.stringify({id:id, password:password}),{headers:headers})
      .map((response:Response)=>{
        let token:string = response.json() && response.json().token;
        if(token){
          localStorage.setItem('currentUser', JSON.stringify({id:id, token:token}));
          return true;
        }else{
          return false;
        }
      });
  }
  logout():void{
    this._token = null;
    localStorage.removeItem('currentUser');
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}