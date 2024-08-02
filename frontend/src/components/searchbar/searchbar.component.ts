import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchBarComponent {
  public searchPhrase: string = "";

  @Output() searchPhraseChange = new EventEmitter<string>();

  public onSearchPhraseChange() {
    this.searchPhraseChange.emit(this.searchPhrase);
  }
}
