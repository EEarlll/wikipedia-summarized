import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Query } from '../query';
import { CommonModule, DatePipe } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-search-item',
  imports: [
    CardModule,
    ButtonModule,
    RouterModule,
    DatePipe,
    SkeletonModule,
    CommonModule,
  ],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.css',
})
export class SearchItemComponent {
  @Input() info?: Query['query']['search'][0] = undefined;

  ngOnInit() {
    console.log(this.info);
  }

  getFormattedSnippet(): string | null {
    let formattedSnippet = this.info?.snippet;
    formattedSnippet = formattedSnippet?.replace(/<[^>]*>/g, '');
    formattedSnippet = formattedSnippet?.replace(/&quot;/g, '"');

    const maxLength = 150;
    if (formattedSnippet && formattedSnippet.length > maxLength) {
      formattedSnippet = formattedSnippet.substring(0, maxLength) + '...';
    }

    return formattedSnippet || null;
  }
}
