import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { PagesComponent } from './layouts/pages/pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';

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
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'promesas', component: PromesasComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
