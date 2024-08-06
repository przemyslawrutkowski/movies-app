import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import NewReviewI from '../../interfaces/newReview';
import { ReviewsService } from '../../services/reviews.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviewform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reviewform.component.html',
  styleUrls: ['./reviewform.component.css']
})
export class ReviewFormComponent {
  private reviewsService = inject(ReviewsService);
  private router = inject(Router);
  ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  reviewContent = "It was a great movie...";
  movieRating = 10;

  @Input({
    required: true
  }) movieId!: string;

  addReview(reviewForm: NgForm) {
    if (reviewForm.valid) {
      const review: NewReviewI = {
        movieId: this.movieId,
        rating: Number(this.movieRating),
        content: this.reviewContent,
        creationDate: new Date().toISOString()
      };
      this.reviewsService.postReview(review).subscribe({
        next: _id => {
          console.log(`Created review with id: ${_id}.`);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.router.navigate(['login']);
          }

        }
      })
    }
  }
}