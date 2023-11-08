import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Import the Httpclient module
import { HttpClientModule } from '@angular/common/http';
import { FlightTestComponent } from './components/flight-test/flight-test.component';


@NgModule({
  declarations: [
    AppComponent,
    FlightTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
