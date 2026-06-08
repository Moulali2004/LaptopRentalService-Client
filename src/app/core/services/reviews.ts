import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ReviewsResponse } from '../../models/review.models';

@Injectable({
  providedIn: 'root',
})
export class Reviews {
  constructor(private http: HttpClient) { }

  getReviewsForLaptop(laptopId: string): Observable<ReviewsResponse> {
    // Placeholder for future API call to fetch reviews based on laptopId
    return this.http.get<ReviewsResponse>(`${environment.backendApiUrl}/review/getReviewsByLaptopId/${laptopId}`);
  }
}
