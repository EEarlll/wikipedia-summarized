import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'linkifyArticle',
})
export class LinkifyArticlePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  transform(article: string, links: string[] | undefined): SafeHtml {
    if (!article || !links || links.length === 0) {
      return article;
    }

    const sortedLinks = links.sort((a, b) => b.length - a.length);
    const pattern = sortedLinks
      .map((link) =>
        link.indexOf(' ') > -1
          ? this.escapeRegExp(link)
          : '\\b' + this.escapeRegExp(link) + '\\b'
      )
      .join('|');

    const regex = new RegExp(pattern, 'gi');

    const transformed = article.replace(regex, (match) => {
      return `<a href="article/${match}">${match}</a>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(transformed);
  }
}
