import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { ScanComponent } from './scan/scan.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { NavComponent } from './nav/nav.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { ArticlesComponent } from './articles/articles.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { ArticleDetailsComponent } from './articles/article-details/article-details.component';
import { PageItemComponent } from './articles/article-details/page-item/page-item.component';


@NgModule({
  declarations: [ScanComponent, MainContainerComponent, NavComponent, ButtonBarComponent, ArticlesComponent, ShoppingListComponent, ArticleDetailsComponent, PageItemComponent],
    imports: [
        CommonModule,
        MobileRoutingModule,
        InfiniteScrollModule
    ]
})
export class MobileModule {

}
