import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesService } from '../../services/movies.service';
import MovieI from '../../interfaces/movie';
import { GenresListComponent } from '../genreslist/genreslist.component';
import { MovieCardComponent } from '../moviecard/moviecard.component';
import { SearchBarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-movieslist',
  standalone: true,
  imports: [CommonModule, GenresListComponent, MovieCardComponent, SearchBarComponent],
  templateUrl: './movieslist.component.html',
  styleUrl: './movieslist.component.css'
})
export class MoviesListComponent implements OnInit {
  private moviesService: MoviesService = inject(MoviesService);
  public movies: MovieI[] = [];

  ngOnInit() {
    this.moviesService.getMovies().subscribe((movies: MovieI[]) => {
      this.movies = movies;
    });
  }
}
