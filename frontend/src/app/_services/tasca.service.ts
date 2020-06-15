import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Tasca from '../models/tasca.model';

@Injectable({
  providedIn: 'root'
})
export class TascaService {
  private readonly BASE_URL = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {}

  fetchTascas(): Observable<Tasca[]> {
    return this.http.get<Tasca[]>(`${this.BASE_URL}get-tascas`);
  }

  fetchTasca(tascaId: string): Observable<Tasca> {
    return this.http.get<Tasca>(`${this.BASE_URL}get-tasca/${tascaId}`);
  }

  getImage(tascaId: string): Observable<Blob> {
    return this.http.get(`${this.BASE_URL}get-image/${tascaId}`, {
      responseType: 'blob'
    });
  }
  
  createTasca(model: Tasca): Observable<Tasca> {
    const formData = new FormData();
    formData.append('name', model.name);
    formData.append('address', model.address);
    formData.append('rating', model.rating.toString());
    formData.append('photo', model.photo);

    return this.http.post<Tasca>(`${this.BASE_URL}create-tasca`, formData);
  }

  editTasca(model: Tasca) {
    const formData = new FormData();
    formData.append('name', model.name);
    formData.append('address', model.address);
    formData.append('rating', model.rating.toString());
    formData.append('photo', model.photo);

    return this.http.put(`${this.BASE_URL}edit-tasca/${model._id}`, formData);
  }
  
  deleteTasca(tascaId: string) {
    return this.http.delete(`${this.BASE_URL}delete-tasca/${tascaId}`);
  }
}
