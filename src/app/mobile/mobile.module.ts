import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { ScanComponent } from './scan/scan.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [ScanComponent, MainContainerComponent, NavComponent],
  imports: [
    CommonModule,
    MobileRoutingModule
  ]
})
export class MobileModule { }
