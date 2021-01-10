import {Routes} from '@angular/router';
import {ScanComponent} from './desktop/scan/scan.component';
import {ArticlesComponent} from './desktop/articles/articles.component';
import {ShoppingListComponent} from './desktop/shopping-list/shopping-list.component';
import {UserComponent} from './desktop/user/user.component';
import {EditUserResolver} from './_resolvers/edit-user.resolver';
import {AuthGuard} from './_guards/auth.guard';
import {HomeComponent} from './home/home.component';
import {InvitationsComponent} from './desktop/invitations/invitations.component';
import {InvitationsResolver} from './_resolvers/invitations.resolver';
import {ArticlesResolver} from './_resolvers/articles.resolver';
import {AccountActivationComponent} from './account-activation/account-activation.component';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'AccountActivation', component: AccountActivationComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    loadChildren: () => import('./desktop/desktop.module').then(m => m.DesktopModule)
    // children: [
    //   {path: 'scan', component: ScanComponent},
    //   {path: 'articles', component: ArticlesComponent, resolve: {articles: ArticlesResolver}},
    //   {path: 'shopping-list', component: ShoppingListComponent},
    //   {path: 'users/:id', component: UserComponent, resolve: {user: EditUserResolver}},
    //   {path: 'users/:id/invitations', component: InvitationsComponent, resolve: {invitations: InvitationsResolver}}
    // ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
