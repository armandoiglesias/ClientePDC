import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import {HttpModule, JsonpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

// Servicio
import { PlandecompraService} from './servicios/plandecompra.service';

// Routing
import { APP_ROUTING } from './app.routes';
import { AcortarStrPipe } from './pipes/acortar-str.pipe'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AcortarStrPipe
  ],
  imports: [
    BrowserModule, APP_ROUTING, FormsModule, HttpModule, JsonpModule
  ],
  providers: [
    PlandecompraService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
