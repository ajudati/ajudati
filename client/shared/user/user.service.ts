import { Injectable    } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }    from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { User       }    from './user';

@Injectable()
export class UserService{
  constructor(private http: Http){ }

  register(user:User):Promise<User>{
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    return this.http
      .post('/api/user', JSON.stringify(user), {headers:headers})
      .toPromise()
      .then(res=>res.json().data)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}