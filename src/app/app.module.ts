import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {StatesService} from './services/states.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ngfModule} from 'angular-file';

import { BooksComponent } from './views/books.component';
import { ChaptersComponent } from './views/chapters.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    ChaptersComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ngfModule
  ],
  providers: [StatesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
