import { Component, Input, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import MovieI from '../../interfaces/movie';
import GenreI from '../../interfaces/genre';
import { GenresService } from '../../services/genres.service';

@Component({
  selector: 'app-moviedetails',
  standalone: true,
  imports: [],
  templateUrl: './moviedetails.component.html',
  styleUrl: './moviedetails.component.css'
})
export class MovieDetailsComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private genresService = inject(GenresService);
  movieId = '';
  movie!: MovieI;
  genres!: GenreI[];

  @Input() set id(id: string) {
    this.movieId = id;
  }

  ngOnInit() {
    this.moviesService.getMovie(this.movieId).subscribe((movie: MovieI) => {
      this.movie = movie;
      this.genresService.getGenres().subscribe((genres: GenreI[]) => {
        this.genres = genres.filter((genre: GenreI) => {
          return this.movie.genres.includes(genre._id);
        });
      });
    });
  }
}
