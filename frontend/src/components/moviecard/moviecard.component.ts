import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import MovieI from '../../interfaces/movie';

@Component({
  selector: 'app-moviecard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './moviecard.component.html',
  styleUrl: './moviecard.component.css'
})
export class MovieCardComponent {
  @Input({
    required: true
  }) movie!: MovieI;
}
