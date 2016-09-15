import { Injectable }          from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate{
  constructor (private router: Router){ }
  canActivate():boolean{
    if(localStorage.getItem('currentUser')) return true;
    this.router.navigate(['/login']);
  }
}