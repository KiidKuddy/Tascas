import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { TascaService } from '../tasca.service';
import Tasca from 'src/app/models/tasca.model';

@Injectable({
  providedIn: 'root'
})
export class TascaResolver {
  constructor(private tascaService: TascaService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Tasca> {
    return this.tascaService.fetchTasca(route.paramMap.get('id'));
  }
}
