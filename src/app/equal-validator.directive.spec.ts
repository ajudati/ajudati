/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EqualValidatorDirective } from './equal-validator.directive';

describe('Directive: EqualValidatorDirective', () => {
  it('should create an instance', () => {
    let directive = new EqualValidatorDirective('password2', 'false');
    expect(directive).toBeTruthy();
  });
});
