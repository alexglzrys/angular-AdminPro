import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './layouts/pages/pages.component';


const routes: Routes = [
  {
    path: '',
    // Layout principal para este módulo
    component: PagesComponent,
    // Proteger todas estas rutas
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    // Carga peresoza de rutas hijas
    loadChildren: () => import('./pages-children-routing.module').then(m => m.PagesChildrenRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
