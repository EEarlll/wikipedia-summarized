import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Page, Query } from '../query';
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
  @Input() info?: Page = undefined;

  ngOnInit() {
    console.log(this.info);
  }
}
