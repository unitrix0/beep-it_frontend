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
import {PageSectionComponent} from './articles/article-container/page-section/page-section.component';
import {BaseDataComponent} from './articles/article-container/base-data/base-data.component';
import {StockSettingsComponent} from './articles/article-container/stock-settings/stock-settings.component';
import {StoresComponent} from './articles/article-container/stores/stores.component';
import {StockComponent} from './articles/article-container/stock/stock.component';
import {ArticleDetailsComponent} from './articles/article-details/article-details.component';
import { TextBoxComponent } from './shared/section-components/text-box/text-box.component';
import { ToggleComponent } from './shared/section-components/toggle/toggle.component';
import { SelectComponent } from './shared/section-components/select/select.component';


@NgModule({
  declarations: [
    ScanComponent,
    MainContainerComponent,
    NavComponent,
    ButtonBarComponent,
    ArticlesComponent,
    ShoppingListComponent,
    ArticleContainerComponent,
    PageSectionComponent,
    BaseDataComponent,
    StockSettingsComponent,
    StoresComponent,
    StockComponent,
    ArticleDetailsComponent,
    TextBoxComponent,
    ToggleComponent,
    SelectComponent],
  imports: [
    CommonModule,
    MobileRoutingModule,
    InfiniteScrollModule
  ]
})
export class MobileModule {

}
