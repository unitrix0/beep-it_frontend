import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ScanComponent} from './scan/scan.component';
import {MainContainerComponent} from './main-container/main-container.component';
import {ArticlesComponent} from './articles/articles.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ArticleSubNavContainerComponent} from './articles/article-sub-nav-container/article-sub-nav-container.component';
import {BaseDataComponent} from './articles/article-details/base-data/base-data.component';
import {StockSettingsComponent} from './articles/article-details/stock-settings/stock-settings.component';
import {StoresComponent} from './articles/article-details/stores/stores.component';
import {StockComponent} from './articles/article-details/stock/stock.component';

const routes: Routes = [
  {
    path: 'main', component: MainContainerComponent,
    children: [
      {path: 'scan', component: ScanComponent},
      {path: 'articles', component: ArticlesComponent},
      {path: 'shopping-list', component: ShoppingListComponent},
      {
        path: 'articles/:barcode', component: ArticleSubNavContainerComponent,
        children: [
          {path: '', redirectTo: 'basedata', pathMatch: 'full'},
          {path: 'basedata', component: BaseDataComponent},
          {path: 'stocksettings', component: StockSettingsComponent},
          {path: 'stores', component: StoresComponent},
          {path: 'stock', component: StockComponent}
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule {
}
