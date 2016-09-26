import { Injectable }          from '@angular/core';
import { Router, CanActivate } from '@angular/router';


import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private auth:AuthService, private router:Router){}
  canActivate():Observable<boolean>{
    return this.auth.canActivate().do(authenticated => {
      if (!authenticated) {
        this.router.navigate(['/login']);
      }
    });
  }
}