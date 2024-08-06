import { Component, Input, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ReviewsService } from '../../services/reviews.service';
import { GenresService } from '../../services/genres.service';
import MovieI from '../../interfaces/movie';
import GenreI from '../../interfaces/genre';
import ReviewI from '../../interfaces/review';
import { ReviewsListComponent } from '../reviewslist/reviewslist.component';
import { ReviewFormComponent } from '../reviewform/reviewform.component';

@Component({
  selector: 'app-moviedetails',
  standalone: true,
  imports: [ReviewsListComponent, ReviewFormComponent],
  templateUrl: './moviedetails.component.html',
  styleUrl: './moviedetails.component.css'
})
export class MovieDetailsComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private genresService = inject(GenresService);
  private reviewsService = inject(ReviewsService);
  movieId = '';
  movie!: MovieI;
  genres!: GenreI[];
  reviews!: ReviewI[];

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

    this.reviewsService.getReviews(this.movieId).subscribe((reviews: ReviewI[]) => {
      this.reviews = reviews;
    });
  }
}
