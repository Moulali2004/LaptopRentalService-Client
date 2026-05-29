import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ActiveLaptop, LaptopDetailsResponse, LaptopResponse } from '../../models/laptop.models';

@Injectable({
  providedIn: 'root',
})
export class Laptop {

  private activeLaptopsSubject = new BehaviorSubject<ActiveLaptop[] | null>(null);
  activeLaptops$ = this.activeLaptopsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getActiveLaptops(): Observable<LaptopResponse> {
    return this.http.get<LaptopResponse>(`${environment.backendApiUrl}/laptop/getActiveLaptops`).pipe(
      tap((res) => {
        console.log(res);
        this.activeLaptopsSubject.next(res.activeLaptops);
      })
    );
  }

  getLaptopById(id: string): Observable<LaptopDetailsResponse> {
    return this.http.get<LaptopDetailsResponse>(`${environment.backendApiUrl}/laptop/getLaptopById/${id}`);
  }
}
