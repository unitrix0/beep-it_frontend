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
import {ArticleSubNavContainerComponent} from './articles/article-sub-nav-container/article-sub-nav-container.component';
import {PageSectionComponent} from './articles/article-details/page-section/page-section.component';
import {BaseDataComponent} from './articles/article-details/base-data/base-data.component';
import {StockSettingsComponent} from './articles/article-details/stock-settings/stock-settings.component';
import {StoresComponent} from './articles/article-details/stores/stores.component';
import {StockComponent} from './articles/article-details/stock/stock.component';
import {ArticleDetailsHeaderComponent} from './articles/article-details/article-details-header/article-details-header.component';
import {TextBoxComponent} from './shared/section-components/text-box/text-box.component';
import {ToggleComponent} from './shared/section-components/toggle/toggle.component';
import {SelectComponent} from './shared/section-components/select/select.component';
import {IconContainerComponent} from './shared/section-components/icon-container/icon-container.component';
import {SubNavigationHostDirective} from './shared/sub-navigation/sub-navigation-host.directive';
import {SubNavigationOutletComponent} from './shared/sub-navigation/sub-navigation-outlet.component';
import {SubNavigationLinkDirective} from './shared/sub-navigation/sub-navigation-link.directive';
import {ArticleDetailsComponent} from './articles/article-details/article-details.component';
import { TextBoxEditComponent } from './shared/section-components/text-box/text-box-edit/text-box-edit.component';


@NgModule({
  declarations: [
    ScanComponent,
    MainContainerComponent,
    NavComponent,
    ButtonBarComponent,
    ArticlesComponent,
    ShoppingListComponent,
    ArticleSubNavContainerComponent,
    PageSectionComponent,
    BaseDataComponent,
    StockSettingsComponent,
    StoresComponent,
    StockComponent,
    ArticleDetailsHeaderComponent,
    TextBoxComponent,
    ToggleComponent,
    SelectComponent,
    IconContainerComponent,
    SubNavigationHostDirective,
    SubNavigationOutletComponent,
    SubNavigationLinkDirective,
    ArticleDetailsComponent,
    TextBoxEditComponent],
  imports: [
    CommonModule,
    MobileRoutingModule,
    InfiniteScrollModule
  ]
})
export class MobileModule {

}
