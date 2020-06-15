/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TascaResolverService } from './tasca-resolver.service';

describe('Service: TascaResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TascaResolverService]
    });
  });

  it('should ...', inject([TascaResolverService], (service: TascaResolverService) => {
    expect(service).toBeTruthy();
  }));
});
