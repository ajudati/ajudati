import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MdSnackBar }          from '@angular/material';
import { Observable }          from 'rxjs';

import { CallService }         from './call.service';
import { AuthService }         from './auth.service';

@Injectable()
export class CallStoredGuard implements CanActivate{
  constructor(private snackbar:MdSnackBar, private cs:CallService, private router:Router, private as:AuthService){}

  canActivate():Observable<boolean>{
    return this.as.canActivate().map(authenticated => {
      if(this.cs.currentCall != null) return true;
      if(!authenticated){
        this.router.navigate(['/callform']);
        this.snackbar.open("Cadastre o chamado primeiro","OK");    
      }else{
        this.router.navigate(['/callslist']);
      }
      return false;
    });
  }
}