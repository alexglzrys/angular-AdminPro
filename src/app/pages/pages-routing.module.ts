import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { PagesComponent } from './layouts/pages/pages.component';
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  {
    path: '',
    // Layout principal para este módulo
    component: PagesComponent,
    children: [
      // misitio.com/pages -> apunta a misitio.com/dashboard  (coincidencia exacta)
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica-uno', component: GraficaUnoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
