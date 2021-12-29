import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica-uno', component: GraficaUnoComponent },
      // misitio.com/pages -> apunta a misitio.com/pages/dashboard  (coincidencia exacta)
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
