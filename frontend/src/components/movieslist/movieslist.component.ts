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

  private selectedGenres: GenreI[] = [];
  private searchedPhrase: string = "";


  ngOnInit() {
    this.moviesService.getMovies().subscribe((movies: MovieI[]) => {
      this.movies = movies;
      this.filteredMovies = movies;
    });
  }

  private filterMovies() {
    this.filteredMovies = this.movies.filter((movie) => {
      const matchesSearchPhrase = this.searchedPhrase.length === 0 || movie.title.toLowerCase().includes(this.searchedPhrase);
      const matchesGenres = this.selectedGenres.length === 0 || movie.genres.some((genreId) => this.selectedGenres.some((selectedGenre) => selectedGenre._id === genreId));
      return matchesSearchPhrase && matchesGenres;
    });
  }

  public setGenres(selectedGenres: GenreI[]) {
    this.selectedGenres = selectedGenres;
    this.filterMovies();
  }

  public setSearchPhrase(searchedPhrase: string) {
    this.searchedPhrase = searchedPhrase.toLowerCase().trim();
    this.filterMovies();
  }


}
