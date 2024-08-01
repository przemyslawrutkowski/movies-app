import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import GenreI from '../../interfaces/genre';
import { GenresService } from '../../services/genres.service';

@Component({
  selector: 'app-genreslist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genreslist.component.html',
  styleUrl: './genreslist.component.css'
})
export class GenresListComponent implements OnInit {
  private genresService: GenresService = inject(GenresService);
  public genres: GenreI[] = [];

  ngOnInit() {
    this.genresService.getGenres().subscribe((genres: GenreI[]) => {
      this.genres = genres.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
