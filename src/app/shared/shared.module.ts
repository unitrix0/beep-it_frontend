import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShowOnPermissionDirective} from './_directives/show-on-permission.directive';
import {PaginationComponent} from '../desktop/articles/Sidebar/pagination.component';
import {MinimumValueDirective} from './_directives/minimum-value.directive';
import {MaximumValueDirective} from './_directives/maximum-value.directive';
import {RequiredSelectDirective} from './_directives/required-select.directive';
import {HoverClassDirective} from './_directives/hover-class.directive';
import {RoundPipe} from './_helpers/round.pipe';
import {BoolYesNoPipe} from './_helpers/bool-yes-no.pipe';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ShowOnPermissionDirective,
    PaginationComponent,
    MinimumValueDirective,
    MaximumValueDirective,
    RequiredSelectDirective,
    HoverClassDirective,
    RoundPipe,
    BoolYesNoPipe,
  ],
  exports: [
    MaximumValueDirective,
    HoverClassDirective
  ],
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule
  ]
})
export class SharedModule { }
