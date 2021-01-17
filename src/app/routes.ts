import {Routes} from '@angular/router';
import {AuthGuard} from './_guards/auth.guard';
import {HomeComponent} from './home/home.component';
import {AccountActivationComponent} from './account-activation/account-activation.component';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'AccountActivation', component: AccountActivationComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    loadChildren: () => {
      if (window.innerHeight > 1024) {
        return import('./desktop/desktop.module').then(m => m.DesktopModule);
      } else {
        return import('./mobile/mobile.module').then(m => m.MobileModule);
      }
    }
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
