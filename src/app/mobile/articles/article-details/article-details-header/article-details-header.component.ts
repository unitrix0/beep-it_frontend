import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticlesService} from '../../../../_services/articles.service';
import {Article} from '../../../../shared/_models/article';

@Component({
  selector: 'app-article-details-header',
  templateUrl: './article-details-header.component.html',
  styleUrls: ['./article-details-header.component.css']
})
export class ArticleDetailsHeaderComponent implements OnInit {
  article: Article;
  private backUrl: string;

  constructor(private route: ActivatedRoute, private articlesService: ArticlesService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articlesService.lookupArticle(params['barcode'])
        .subscribe(article => {
          this.article = article;
          this.backUrl = `main/article/${article.barcode}`;
        });
    });
  }

  getBackUrl(): string {
    return this.backUrl;
  }

}
