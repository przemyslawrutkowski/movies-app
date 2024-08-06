import { Component, Input } from '@angular/core';
import ReviewI from '../../interfaces/review';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-reviewslist',
  standalone: true,
  imports: [ReviewComponent],
  templateUrl: './reviewslist.component.html',
  styleUrl: './reviewslist.component.css'
})
export class ReviewsListComponent {
  @Input({
    required: true
  }) reviews!: ReviewI[];
}
