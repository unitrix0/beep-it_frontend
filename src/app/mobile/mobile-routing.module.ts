import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ScanComponent} from './scan/scan.component';
import {MainContainerComponent} from './main-container/main-container.component';

const routes: Routes = [
  {
    path: 'main', component: MainContainerComponent,
    children: [
      {path: 'scan', component: ScanComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule {
}
