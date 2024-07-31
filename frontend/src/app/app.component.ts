import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { SearchBarComponent } from '../components/searchbar/searchbar.component';
import { FilmCardComponent } from '../components/filmcard/filmcard.component';
import { GenresListComponent } from '../components/genreslist/genreslist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SearchBarComponent, FilmCardComponent, GenresListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}


