import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';


const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  // misitio.com -> apunta a misitio.com/pages/dashboard  (coincidencia exacta)
  {
    path: '',
    redirectTo: 'pages/dashboard',
    pathMatch: 'full',
  },
  // Cualquier otra ruta no registrada muestra el componente 404
  {
    path: '**',
    component: NoPageFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
