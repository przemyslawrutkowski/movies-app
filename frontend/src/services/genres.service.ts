import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import GenreI from '../interfaces/genre';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private url = 'http://localhost:3000/api/genres';
  private http = inject(HttpClient);

  getGenres(): Observable<GenreI[]> {
    return this.http.get<GenreI[]>(this.url);
  }
}
