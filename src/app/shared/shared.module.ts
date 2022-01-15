import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // Los componentes de este módulo hacen uso de los componentes de ruta (routerLink, etc)
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    BreadcrumbsComponent,
  ]
})
export class SharedModule { }
