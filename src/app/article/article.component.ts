import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from '../query.service';
import { ArticleInterface } from '../query';
import { ArticleService } from '../article.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-article',
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent {
  queryParams: string = '';
  info: ArticleInterface | undefined; 
  article: string | null = null;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private query: QueryService,
    private llm: ArticleService,
    private firebase: FirebaseService
  ) {
    this.route.params.subscribe((params) => {
      this.queryParams = params['id'];
      this.loadItem(this.queryParams);
    });
  }

  async loadItem(param: string) {
    this.info = await this.query.articleSearch(param);

    const existingData = await this.firebase.checkDocument(this.queryParams);

    if (existingData) {
      this.article = existingData['synthesizedOutput'];
    } else {
      this.article = await this.llm.gemini(this.info.extract);
      await this.firebase.setDocument(
        this.queryParams,
        this.info.title,
        this.article,
        this.info.extract
      );
    }
  }

  navigateToLastPage(): void {
    this.location.back();
  }
}
