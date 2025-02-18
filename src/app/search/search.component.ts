import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { DividerModule } from 'primeng/divider';
import { SearchItemComponent } from '../search-item/search-item.component';
import { PaginatorModule } from 'primeng/paginator';
import { RouterModule } from '@angular/router';
import { QueryService } from '../query.service';
import { Query } from '../query';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [
    ButtonModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    IconField,
    InputIcon,
    DividerModule,
    SearchItemComponent,
    PaginatorModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  queryParam: string = '';
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 120;
  items: Query | undefined;

  constructor(
    private route: ActivatedRoute,
    private query: QueryService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.queryParam = params['q'];
      this.loadItem(this.queryParam);
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  async loadItem(param: string) {
    this.items = await this.query.initialSearch(param);
  }

  async search(event?: any, eventValue?: string) {
    this.router.navigate(['/search'], {
      queryParams: { q: event.target.value ? event.target.value : eventValue },
    });
  }
}
