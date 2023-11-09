import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Import the Httpclient module
import { HttpClientModule } from '@angular/common/http';

//Components
import { FlightTestComponent } from './components/flight-test/flight-test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { CreateRouteComponent } from './pages/create-route/create-route.component';

import { CardJourneyComponent } from './components/card-journey/card-journey.component';
//Forms
import { ReactiveFormsModule } from '@angular/forms';








@NgModule({
  declarations: [
    AppComponent,
    FlightTestComponent,
    HomeComponent,
    NumberOnlyDirective,
    CreateRouteComponent,
    CardJourneyComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
