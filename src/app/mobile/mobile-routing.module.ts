import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ScanComponent} from './scan/scan.component';
import {MainContainerComponent} from './main-container/main-container.component';
import {ArticlesComponent} from './articles/articles.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ArticleDetailsComponent} from './articles/article-details/article-details.component';

const routes: Routes = [
  {
    path: 'main', component: MainContainerComponent,
    children: [
      {path: 'scan', component: ScanComponent},
      {path: 'articles', component: ArticlesComponent},
      {path: 'shopping-list', component: ShoppingListComponent},
      {path: 'article/:barcode', component: ArticleDetailsComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule {
}
