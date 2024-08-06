import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import ReviewI from '../../interfaces/review';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input({
    required: true
  }) review!: ReviewI;
}

