import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import NewReviewI from '../interfaces/newReview';
import ReviewI from '../interfaces/review';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private url = 'http://localhost:3000/api/reviews';
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  getReviews(id: string): Observable<ReviewI[]> {
    return this.http.get<ReviewI[]>(`${this.url}/${id}`);
  }

  postReview(review: NewReviewI) {
    return this.http.post(this.url, review, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.localStorageService.get('jwt')}`)
    });
  }
}
