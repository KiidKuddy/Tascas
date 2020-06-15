/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageResolverService } from './image-resolver.service';

describe('Service: ImageResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageResolverService]
    });
  });

  it('should ...', inject([ImageResolverService], (service: ImageResolverService) => {
    expect(service).toBeTruthy();
  }));
});
