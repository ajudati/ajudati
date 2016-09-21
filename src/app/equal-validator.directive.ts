import { Directive, Attribute }                      from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appValidateEqual][formControlName],[appValidateEqual][formControl],[appValidateEqual][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true}]
})
export class EqualValidatorDirective implements Validator {

  constructor(
    @Attribute('appValidateEqual') public validateEqual: string,
    @Attribute('reverse') public reverse: string) {  }
  private get isReverse(): boolean {
     if (!this.reverse) {return false; }
     return this.reverse === 'true' ? true : false;
  }
  validate(c: AbstractControl): {[key: string]: any}{
    let v = c.value;
    let e = c.root.get(this.validateEqual);
    // value not equal
    if(e && v !== e.value && !this.isReverse) {return {validateEqual: false };}

    // value equal and reverse
    if (e && v === e.value && this.isReverse) {
      delete e.errors['appValidateEqual'];
      if (!Object.keys(e.errors).length) {e.setErrors(null);}
    }

    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({ validateEqual: false });
    }
    return null;
  }
}
