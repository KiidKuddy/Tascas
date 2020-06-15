import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TascaService } from '../tasca.service';

@Injectable({
  providedIn: 'root'
})
export class ImageResolver implements Resolve<any> {
  constructor(private tascaService: TascaService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Blob> {
    return this.tascaService.getImage(route.paramMap.get('id'));
  }
}
