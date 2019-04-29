import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ScanComponent } from './scan/scan.component';
import {FormsModule} from '@angular/forms';
import { ScanCardComponent } from './scan/scan-card/scan-card.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleCardComponent } from './articles/article-card/article-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ScanComponent,
    ScanCardComponent,
    ArticleEditComponent,
    ArticlesComponent,
    ArticleCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
