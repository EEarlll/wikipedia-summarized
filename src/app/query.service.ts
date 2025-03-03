import { Injectable } from '@angular/core';
import { ArticleInterface, Query } from './query';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  baseUrl = 'https://en.wikipedia.org/w/api.php';

  async initialSearch(query: string, offset: number = 0): Promise<Query> {
    const cacheKey = `search-${query}-${offset}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const endPoint =
      `${this.baseUrl}?action=query&format=json&generator=search` +
      `&prop=pageimages|description|extracts|info` +
      `&piprop=thumbnail&pithumbsize=500` +
      `&gsrenablerewrites=True&gsroffset=${offset}` +
      `&gsrlimit=8&exchars=500&exlimit=max` +
      `&gsrinfo=totalhits|suggestion|rewrittenquery` +
      `&explaintext=true&exintro=true&origin=*`;
    const userUrl = `${endPoint}&gsrsearch=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(userUrl, {
        headers: {
          Authorization: environment.apiKey,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
      throw error;
    }
  }

  async articleSearch(title: string): Promise<ArticleInterface> {
    const cacheKey = `article-${title}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const endPoint =
      `${this.baseUrl}?action=query` +
      `&prop=extracts|pageimages|images|links` +
      `&format=json&exlimit=1&explaintext=&piprop=original` +
      `&pllimit=500&origin=*`;
    const userUrl = `${endPoint}&titles=${title}`;

    try {
      const response = await fetch(userUrl, {
        headers: {
          Authorization: environment.apiKey,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const pages = data.query.pages;
      const page: any = Object.values(pages)[0];

      const article: ArticleInterface = {
        title: page.title,
        extract: page.extract,
        original: page.original
          ? {
              source: page.original.source,
              width: page.original.width,
              height: page.original.height,
            }
          : undefined,
        image: page.original?.source,
        links: page.links?.map((link: any) => link.title),
      };
      console.log(article);
      sessionStorage.setItem(cacheKey, JSON.stringify(article));
      return article;
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
      throw error;
    }
  }
}
