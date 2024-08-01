import { Component, Input } from '@angular/core';

import MovieI from '../../interfaces/movie';

@Component({
  selector: 'app-moviecard',
  standalone: true,
  imports: [],
  templateUrl: './moviecard.component.html',
  styleUrl: './moviecard.component.css'
})
export class MovieCardComponent {
  @Input({
    required: true
  }) public movie!: MovieI;
}
