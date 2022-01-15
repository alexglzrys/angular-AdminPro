import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { PagesComponent } from './layouts/pages/pages.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: '',
    // Layout principal para este módulo
    component: PagesComponent,
    // Proteger todas estas rutas
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      // misitio.com/pages -> apunta a misitio.com/dashboard  (coincidencia exacta)
      // data: permite al desarrollador mandar datos adicionales al componente de ruta a través de ActivatedRouter
      { path: '', component: DashboardComponent, pathMatch: 'full', data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' }  },
      { path: 'grafica-uno', component: GraficaUnoComponent, data: { title: 'Gráfica' }  },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes Generales' }  },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' }  },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' }  },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfíl de Usuario' } },
      // Mantenimientos
      { path: 'usuarios', component: UsuariosComponent, data: { title: 'Usuarios de aplicación' } },
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales de aplicación' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Médicos de aplicación' } },
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Médico de aplicación' } },
      // Buscador general
      { path: 'search/:termino', component: BusquedaComponent, data: { title: 'Búsqueda general de aplicación'} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
