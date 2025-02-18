import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Query } from '../query';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-item',
  imports: [CardModule, ButtonModule, RouterModule, DatePipe],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.css',
})
export class SearchItemComponent {
  @Input() info!: Query['query']['search'][0];

  ngOnInit() {
    console.log(this.info);
  }

  getFormattedSnippet(): string {
    let formattedSnippet = this.info.snippet;
    formattedSnippet = formattedSnippet.replace(/<[^>]*>/g, ''); 
    formattedSnippet = formattedSnippet.replace(/&quot;/g, '"'); 

    const maxLength = 150; 
    if (formattedSnippet.length > maxLength) {
      formattedSnippet = formattedSnippet.substring(0, maxLength) + '...';
    }

    return formattedSnippet;
  }
}
