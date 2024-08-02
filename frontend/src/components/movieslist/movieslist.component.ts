import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesService } from '../../services/movies.service';
import MovieI from '../../interfaces/movie';
import GenreI from '../../interfaces/genre';
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
  private movies: MovieI[] = [];
  public filteredMovies: MovieI[] = [];

  ngOnInit() {
    this.moviesService.getMovies().subscribe((movies: MovieI[]) => {
      this.movies = movies;
      this.filteredMovies = movies;
    });
  }

  public filterMovies(selectedGenres: GenreI[]) {
    if (selectedGenres.length === 0) {
      this.filteredMovies = this.movies;
    } else {
      this.filteredMovies = this.movies.filter((movie) => {
        return movie.genres.some((genreId) => {
          return selectedGenres.some((selectedGenre) => selectedGenre._id === genreId);
        })
      })
    }
  }
}
