import { Inject, Directive } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { UserService } from './user.service';

import 'rxjs/add/operator/toPromise';

@Directive({
  selector: '[appValidateEmail]',
  providers:[{provide:NG_ASYNC_VALIDATORS,useExisting:EmailExistingValidatorDirective, multi:true}]
})
export class EmailExistingValidatorDirective implements Validator {

  constructor(private us:UserService) {}

  validate(c: AbstractControl): Promise<{[key: string]: any}>{
    return this.us.isEmailRegistered(c.value).then(value => {
      if(value){
        return {appValidateEmail:true};
      }else{
        return null;
      }
    });
    // .map(value => {
    //   if(value){
    //     return {appValidateEmail:true};
    //   }else{
    //     return {appValidateEmail:true};
    //   }
    // }).toPromise();
  }
}
