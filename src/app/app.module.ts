import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Import the Httpclient module
import { HttpClientModule } from '@angular/common/http';

//Components
import { CardJourneyComponent } from './components/card-journey/card-journey.component';

//Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Pages
import { HomeComponent } from './pages/home/home.component';
import { CreateRouteComponent } from './pages/create-route/create-route.component';

//Directives
import { NumberOnlyDirective } from './directives/number-only.directive';

//Forms
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
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
