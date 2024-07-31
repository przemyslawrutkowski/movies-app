import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genreslist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genreslist.component.html',
  styleUrl: './genreslist.component.css'
})
export class GenresListComponent {
  genres = ['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Historical', 'Horror', 'Mystery', 'Philosophical', 'Political', 'Romance', 'Saga', 'Satire', 'Science Fiction', 'Social', 'Speculative', 'Thriller', 'Urban', 'Western'];

  constructor() { }

  ngOnInit() {
  }
}
