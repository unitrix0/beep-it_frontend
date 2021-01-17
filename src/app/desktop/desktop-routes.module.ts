import {RouterModule, Routes} from '@angular/router';
import {InvitationsResolver} from '../_resolvers/invitations.resolver';
import {InvitationsComponent} from './invitations/invitations.component';
import {EditUserResolver} from '../_resolvers/edit-user.resolver';
import {UserComponent} from './user/user.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ArticlesResolver} from '../_resolvers/articles.resolver';
import {ArticlesComponent} from './articles/articles.component';
import {ScanComponent} from './scan/scan.component';
import {NgModule} from '@angular/core';
import {MainContainerComponent} from './main-container/main-container.component';

const appRoutes: Routes = [
  {
    path: 'main', component: MainContainerComponent, children: [
      {path: 'scan', component: ScanComponent},
      {path: 'articles', component: ArticlesComponent, resolve: {articles: ArticlesResolver}},
      {path: 'shopping-list', component: ShoppingListComponent},
      {path: 'users/:id', component: UserComponent, resolve: {user: EditUserResolver}},
      {path: 'users/:id/invitations', component: InvitationsComponent, resolve: {invitations: InvitationsResolver}}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})

export class DesktopRoutes {
}
