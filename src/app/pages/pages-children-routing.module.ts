import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

/** Módulo de rutas hijas que serán cargadas mediante LazyLoad */

const childrenRoutes: Routes = [
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

  { path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales de aplicación' } },
  { path: 'medicos', component: MedicosComponent, data: { title: 'Médicos de aplicación' } },
  { path: 'medico/:id', component: MedicoComponent, data: { title: 'Médico de aplicación' } },
  // Buscador general
  { path: 'search/:termino', component: BusquedaComponent, data: { title: 'Búsqueda general de aplicación'} },
  // Rutas administrativas
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    canLoad: [AdminGuard],
    component: UsuariosComponent,
    data: { title: 'Usuarios de aplicación' }
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childrenRoutes)],
  exports: [RouterModule]
})
export class PagesChildrenRoutingModule { }
