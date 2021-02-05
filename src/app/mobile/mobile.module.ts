import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MobileRoutingModule} from './mobile-routing.module';
import {ScanComponent} from './scan/scan.component';
import {MainContainerComponent} from './main-container/main-container.component';
import {NavComponent} from './nav/nav.component';
import {ButtonBarComponent} from './button-bar/button-bar.component';
import {ArticlesComponent} from './articles/articles.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ArticleContainerComponent} from './articles/article-container/article-container.component';
import {PageItemComponent} from './articles/article-container/page-item/page-item.component';
import {BaseDataComponent} from './articles/article-container/base-data/base-data.component';
import {StockSettingsComponent} from './articles/article-container/stock-settings/stock-settings.component';
import {StoresComponent} from './articles/article-container/stores/stores.component';
import {StockComponent} from './articles/article-container/stock/stock.component';
import {ArticleDetailsComponent} from './articles/article-details/article-details.component';


@NgModule({
  declarations: [
    ScanComponent,
    MainContainerComponent,
    NavComponent,
    ButtonBarComponent,
    ArticlesComponent,
    ShoppingListComponent,
    ArticleContainerComponent,
    PageItemComponent,
    BaseDataComponent,
    StockSettingsComponent,
    StoresComponent,
    StockComponent,
    ArticleDetailsComponent],
  imports: [
    CommonModule,
    MobileRoutingModule,
    InfiniteScrollModule
  ]
})
export class MobileModule {

}
