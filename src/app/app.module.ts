import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {StatesService} from './services/states.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UploadService} from './services/upload.service';
import {BooksComponent} from './views/books.component';
import {ChaptersComponent} from './views/chapters.component';

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
    ReactiveFormsModule
  ],
  providers: [StatesService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
