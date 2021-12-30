import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { PagesComponent } from './layouts/pages/pages.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficaUnoComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
