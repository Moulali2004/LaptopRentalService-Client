import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActiveLaptop } from '../../models/laptop.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Laptop {

  // private activeLaptopsSubject = new BehaviorSubject<ActiveLaptop | null>(null);
  // activeLaptops$ = this.activeLaptopsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getActiveLaptops(): Observable<ActiveLaptop> {
    return this.http.get<ActiveLaptop>(`${environment.backendApiUrl}/laptop/getActiveLaptops`);
  }
}
