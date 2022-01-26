import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksectionComponent } from './booksection/booksection.component';
import { PushpulldataService } from './services/pushpulldata.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    // all the components that are part of this application
    AppComponent,
    BooksectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
  ],
  providers: [
    PushpulldataService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
