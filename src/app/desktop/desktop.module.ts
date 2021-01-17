import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScanComponent} from './scan/scan.component';
import {ScanCardComponent} from './scan/scan-card/scan-card.component';
import {ArticleEditComponent} from './articles/article-edit/article-edit.component';
import {ArticlesComponent} from './articles/articles.component';
import {ArticleCardComponent} from './articles/article-card/article-card.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {UserComponent} from './user/user.component';
import {RegistrationComponent} from './registration/registration.component';
import {InvitationsComponent} from './invitations/invitations.component';
import {InviteDialogComponent} from './user/invite-dialog/invite-dialog.component';
import {ValidateInvitationRecipientDirective} from '../shared/_helpers/validate-invitation-recipient.directive';
import {EnvironmentEditComponent} from './user/environment-edit/environment-edit.component';
import {ProfileComponent} from './user/profile/profile.component';
import {NameOrBarcodeComponent} from './articles/Sidebar/name-or-barcode.component';
import {ArticleFilterComponent} from './articles/Sidebar/article-filter.component';
import {EnvironmentFilterComponent} from './articles/Sidebar/environment-filter.component';
import {ArticleUserSettingsComponent} from './articles/article-user-settings/article-user-settings.component';
import {ArticleStockComponent} from './articles/article-stock/article-stock.component';
import {ArticleCheckinComponent} from './articles/article-checkin/article-checkin.component';
import {ArticleImageComponent} from './articles/article-image/article-image.component';
import {CheckOutDialogComponent} from './articles/check-out-dialog/check-out-dialog.component';
import {ArticleCheckOutComponent} from './articles/article-check-out/article-check-out.component';
import {FillLevelComponent} from '../shared/_helpers/fill-level.component';
import {StockEntryListComponent} from './articles/stock-entry-list/stock-entry-list.component';
import {ArticleOpenComponent} from './articles/article-open/article-open.component';
import {ArticleOpenDialogComponent} from './articles/article-open-dialog/article-open-dialog.component';
import {UserSettingsComponent} from './user/user-settings/user-settings.component';
import {SelectCameraDialogComponent} from './scan/select-camera-dialog/select-camera-dialog.component';
import {FormsModule} from '@angular/forms';
import {EnvironmentSelectorComponent} from './environment-selector/environment-selector.component';
import {ActivityLogComponent} from './scan/activity-log/activity-log.component';
import {CustomFormsModule} from 'ngx-custom-validators';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {Ng5SliderModule} from 'ng5-slider';
import {DesktopRoutes} from './desktop-routes.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {SharedModule} from '../shared/shared.module';
import { MainContainerComponent } from './main-container/main-container.component';
import {NavComponent} from './nav/nav.component';


@NgModule({
  declarations: [
    NavComponent,
    ScanComponent,
    ScanCardComponent,
    ArticleEditComponent,
    ArticlesComponent,
    ArticleCardComponent,
    ShoppingListComponent,
    UserComponent,
    RegistrationComponent,
    InvitationsComponent,
    InviteDialogComponent,
    ValidateInvitationRecipientDirective,
    EnvironmentEditComponent,
    ProfileComponent,
    NameOrBarcodeComponent,
    ArticleFilterComponent,
    EnvironmentFilterComponent,
    ArticleUserSettingsComponent,
    ArticleStockComponent,
    ArticleCheckinComponent,
    ArticleImageComponent,
    CheckOutDialogComponent,
    ArticleCheckOutComponent,
    FillLevelComponent,
    StockEntryListComponent,
    ArticleOpenComponent,
    ArticleOpenDialogComponent,
    UserSettingsComponent,
    SelectCameraDialogComponent,
    EnvironmentSelectorComponent,
    ActivityLogComponent,
    MainContainerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    Ng5SliderModule,
    DesktopRoutes,
    BsDatepickerModule.forRoot(),
    SharedModule
  ]
})
export class DesktopModule {
}
