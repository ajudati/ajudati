/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CallService } from './call.service';

describe('Service: Call', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CallService]
    });
  });

  it('should ...', inject([CallService], (service: CallService) => {
    expect(service).toBeTruthy();
  }));
});
