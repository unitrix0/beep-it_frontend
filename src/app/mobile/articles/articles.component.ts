import {Component, OnInit} from '@angular/core';
import {ArticlesService} from '../../_services/articles.service';
import {Article} from '../../shared/_models/article';
import {ArticlesFilter} from '../../shared/_models/articles-filter';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  filter: ArticlesFilter = {environmentId: '3', storeId: 0, isOpened: false, keepOnStock: false, isOnStock: false, nameOrEan: ''};
  private maxPages: number;
  private pagesLoaded = 1;

  constructor(public articlesService: ArticlesService) {
  }

  ngOnInit(): void {
    this.articlesService.getArticles(this.pagesLoaded, 15, this.filter)
      .subscribe(result => {
        this.maxPages = result.pagination.totalPages;
        this.articles = result.content;
      });
  }

  loadMore() {
    if (this.pagesLoaded < this.maxPages) {
      console.log(`${this.pagesLoaded} < ${this.maxPages} ${this.articles.length}`);
      this.articlesService.getArticles((this.pagesLoaded + 1), 15, this.filter)
        .subscribe(result => {
          this.maxPages = result.pagination.totalPages;
          this.articles = this.articles.concat(result.content);
          this.pagesLoaded++;
        }, error => {
          console.log('error');
          console.log(error);
        });
    }
  }
}
