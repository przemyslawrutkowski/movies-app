import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import MovieI from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private url = 'http://localhost:3000/api/movies';
  private http = inject(HttpClient);

  getMovies(): Observable<MovieI[]> {
    return this.http.get<MovieI[]>(this.url);
  }

  getMovie(id: string): Observable<MovieI> {
    return this.http.get<MovieI>(`${this.url}/${id}`);
  }
}
