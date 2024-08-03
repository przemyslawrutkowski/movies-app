import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import GenreI from '../../interfaces/genre';
import { GenresService } from '../../services/genres.service';

@Component({
  selector: 'app-genreslist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './genreslist.component.html',
  styleUrl: './genreslist.component.css'
})
export class GenresListComponent implements OnInit {
  private genresService: GenresService = inject(GenresService);
  genres: GenreI[] = [];
  selectedGenres: { [key: string]: boolean } = {};

  @Output() genresChange = new EventEmitter<GenreI[]>();

  ngOnInit() {
    this.genresService.getGenres().subscribe((genres: GenreI[]) => {
      this.genres = genres.sort((a, b) => a.name.localeCompare(b.name));
      this.genres.forEach((genre) => {
        this.selectedGenres[genre._id] = false;
      })
    });
  }

  onGenreChange() {
    const selectedGenres = this.genres.filter((genre) => this.selectedGenres[genre._id]);
    this.genresChange.emit(selectedGenres);
  }
}
