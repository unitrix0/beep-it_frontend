import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ZXingScannerModule} from '@zxing/ngx-scanner';

import {AuthService} from './_services/auth.service';
import {AppComponent} from './app.component';
import {appRoutes} from './routes';
import {ArticlesResolver} from './_resolvers/articles.resolver';
import {EditUserResolver} from './_resolvers/edit-user.resolver';
import {UsersService} from './_services/users.service';
import {JwtModule} from '@auth0/angular-jwt';
import {HomeComponent} from './home/home.component';
import {InvitationsResolver} from './_resolvers/invitations.resolver';
import {registerLocaleData} from '@angular/common';
import localeCh from '@angular/common/locales/de-CH';
import {InviteDialogComponent} from './desktop/user/invite-dialog/invite-dialog.component';
import {ResetScanService} from './_services/reset-scan.service';
import {CodeScannerComponent} from './desktop/scan/code-scanner/code-scanner.component';
import {PermissionsService} from './_services/permissions.service';
import {ArticlesService} from './_services/articles.service';
import {CheckOutDialogComponent} from './desktop/articles/check-out-dialog/check-out-dialog.component';
import {ArticleOpenDialogComponent} from './desktop/articles/article-open-dialog/article-open-dialog.component';
import {LocalStorageItemNames} from './shared/_enums/local-storage-item-names.enum';
import {AccountActivationComponent} from './account-activation/account-activation.component';
import {ErrorInterceptorProvider} from './_interceptors/error.interceptor';
import {CarouselComponent} from './home/carousel/carousel.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {PermissionsChangedInterceptorProvider} from './_interceptors/permissions-changed.interceptor';
import {PermissionHeadersInterceptorProvider} from './_interceptors/add-permission-headers.interceptor';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';

/* Liest den Token aus dem LocalStorage */
export function jwtGetter() {
  const token = localStorage.getItem(LocalStorageItemNames.identityToken);
  return token;
}

registerLocaleData(localeCh, 'de-CH');

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CodeScannerComponent,
        AccountActivationComponent,
        CarouselComponent,
        NavComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: jwtGetter,
                // whitelistedDomains: ['localhost:5001'],
                // blacklistedRoutes: ['localhost:5001/api/auth']
                allowedDomains: ['drone02.hive.loc:5000', 'drone02.hive.loc:5001'],
                disallowedRoutes: ['drone02.hive.loc:5000/api/auth', 'drone02.hive.loc:5001/api/auth']
            }
        }),
        ModalModule.forRoot(),
        FormsModule,
        RouterModule.forRoot(appRoutes, {relativeLinkResolution: 'legacy'}),
        PaginationModule.forRoot(),
        CarouselModule.forRoot(),
        ZXingScannerModule,
        BrowserAnimationsModule
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'de-CH'},
        AuthService,
        UsersService,
        ArticlesResolver,
        EditUserResolver,
        InvitationsResolver,
        ResetScanService,
        PermissionsService,
        ArticlesService,
        ErrorInterceptorProvider,
        PermissionHeadersInterceptorProvider,
        PermissionsChangedInterceptorProvider,
        // tokenExpiredInterceptorProvider
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        InviteDialogComponent,
        CheckOutDialogComponent,
        ArticleOpenDialogComponent
    ]
})
export class AppModule {
}
