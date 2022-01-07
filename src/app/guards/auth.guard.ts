import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuariosService: UsuariosService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Este servicio retorna un booleano si el token enviado es válido y por consiguiente se generó un nuevo token. miso que se almacenó en localStorage
      return this.usuariosService.validarToken().pipe(
        // Efecto secundario si es necesario redireccionar al usuario en caso de que el token no sea válido
        tap((usuarioEstaAutenticado) => {
          if (!usuarioEstaAutenticado) {
            // No esta autenticado, lo redireccionamos a login
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // Este servicio retorna un booleano si el token enviado es válido y por consiguiente se generó un nuevo token. miso que se almacenó en localStorage
      return this.usuariosService.validarToken().pipe(
        // Efecto secundario si es necesario redireccionar al usuario en caso de que el token no sea válido
        tap((usuarioEstaAutenticado) => {
          if (!usuarioEstaAutenticado) {
            // No esta autenticado, lo redireccionamos a login
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }
}
