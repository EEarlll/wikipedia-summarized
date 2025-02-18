import { Injectable } from '@angular/core';
import { ArticleInterface, Query } from './query';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  baseUrl = 'https://en.wikipedia.org/w/api.php';

  async initialSearch(query: string, offset: number = 0): Promise<Query> {
    const endPoint = `${this.baseUrl}?action=query&format=json&list=search&srlimit=8&sroffset=${offset}&srenablerewrites=True&origin=*`;
    const userUrl = `${endPoint}&srsearch=${encodeURIComponent(query)}`;

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
      return data;
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
      throw error;
    }
  }

  async articleSearch(pageid: string): Promise<ArticleInterface> {  
    const endPoint = `${this.baseUrl}?action=query&prop=extracts|pageimages|images&format=json&exlimit=1&explaintext=&piprop=original&origin=*`;
    const userUrl = `${endPoint}&pageids=${pageid}`;

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
      const page = data.query.pages[pageid];

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
        images: page.images?.map((image: any) => ({ title: image.title })),
      };
      console.log(article);
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
