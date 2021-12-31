import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [        // Listado de módulos que se usarán de forma global en la aplicación
    BrowserModule,
    AppRoutingModule, // cargar el registro de rutas principales de la aplicación
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
