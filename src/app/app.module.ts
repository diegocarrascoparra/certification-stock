import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StockPreviewComponent } from './components/stock-preview/stock-preview.component';
import { SentimentComponent } from './pages/sentiment/sentiment.component';
import { MonthsPipe } from './pipes/months.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StockPreviewComponent,
    SentimentComponent,
    MonthsPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
