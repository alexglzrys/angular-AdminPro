import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    NoPageFoundComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
