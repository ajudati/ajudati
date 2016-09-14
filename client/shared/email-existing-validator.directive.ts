import { Inject, Directive } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

interface Body{
  _body:string;
}
@Directive({
  selector: '[validateEmail]',
  providers:[{provide:NG_ASYNC_VALIDATORS,useExisting:EmailExistingValidator, multi:true}]
})
export class EmailExistingValidator implements Validator {
  constructor(private http:Http) {}
  validate(c:AbstractControl):Promise<{[key:string]:any}>{
    return this.http.get('/api/user/existing/'+c.value).map(this.extract).toPromise();
  }
  extract(response:Response){
    if(response.json()) return {validateEmail:true};
    return null;
  }
}