import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { PagesComponent } from './layouts/pages/pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: '',
    // Layout principal para este módulo
    component: PagesComponent,
    children: [
      // misitio.com/pages -> apunta a misitio.com/dashboard  (coincidencia exacta)
      // data: permite al desarrollador mandar datos adicionales al componente de ruta a través de ActivatedRouter
      { path: '', component: DashboardComponent, pathMatch: 'full', data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' }  },
      { path: 'grafica-uno', component: GraficaUnoComponent, data: { title: 'Gráfica' }  },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes Generales' }  },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' }  },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' }  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
