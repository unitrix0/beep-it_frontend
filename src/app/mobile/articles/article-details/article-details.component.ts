import {Component, OnInit} from '@angular/core';
import {NavigationComponent} from '../../navigation-component';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit, NavigationComponent {
  constructor() {
  }

  ngOnInit(): void {
  }

  getBackUrl(): string {
    return 'baseView';
  }
}
