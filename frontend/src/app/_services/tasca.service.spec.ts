/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TascaService } from './tasca.service';

describe('Service: Tasca', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TascaService]
    });
  });

  it('should ...', inject([TascaService], (service: TascaService) => {
    expect(service).toBeTruthy();
  }));
});
