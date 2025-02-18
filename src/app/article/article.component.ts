import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from '../query.service';
import { ArticleInterface } from '../query';

@Component({
  selector: 'app-article',
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent {
  queryParams: string = '';
  info: ArticleInterface | undefined;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private query: QueryService
  ) {
    this.route.params.subscribe((params) => {
      this.queryParams = params['id'];
      this.loadItem(this.queryParams);
    });
  }

  async loadItem(param: string) {
    this.info = await this.query.articleSearch(param);
    console.log(this.info)
  }

  navigateToLastPage(): void {
    this.location.back();
  }
}
