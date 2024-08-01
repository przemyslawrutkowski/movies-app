import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import MovieI from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private url = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) { }

  public getMovies(): Observable<MovieI[]> {
    return this.http.get<MovieI[]>(this.url);
  }
}
