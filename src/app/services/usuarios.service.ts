import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { RegisterUserForm } from '../interfaces/register-user-form';

declare const gapi: any;
const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2!: any;

  constructor(private http: HttpClient,
              private rotuer: Router,
              private ngZone: NgZone) {
                // Iniciar el Google Sign In API
                this.startApp();
              }

  registrarUsuario(formData: RegisterUserForm): Observable<any> {
    const URL = `${ BASE_URL }/usuarios`;
    return this.http.post(URL, formData).pipe(
      tap((res: any) => {
        // Efecto secundario, necesito guardar el token en LocalStorage si el registro es correcto
        // Si no viene la propiedad token, no se crea en localStorage
        localStorage.setItem('token', res.token);
      })
      // Continuar con el flujo;
    );
  }

  login(formData: LoginForm): Observable<any> {
    const URL = `${ BASE_URL }/login`;
    return this.http.post(URL, formData).pipe(
      tap((res: any) => {
        // Efecto secundario, necesito guardar el token en LocalStorage si el login es correcto
        // Si no viene la propiedad token, no se crea en localStorage
        localStorage.setItem('token', res.token);
      })
      // Continuar con el flujo
    );
  }

  loginGoogle(token: string): Observable<any> {
    const URL = `${ BASE_URL }/login/google`;
    return this.http.post(URL, { token });
  }

  // Verificar si el token actual es válido
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    const URL = `${ BASE_URL }/login/renew`;
    return this.http.get(URL, {
      headers: {
        "x-token": token
      }
    }).pipe(
      tap((res: any) => {
        // Efecto secundario
        // Guardar el posible token regenerado en localStorage
        localStorage.setItem('token', res.newToken);
      }),
      map((res:any) => {
        // Transformar la respuesta en un booleano
        //console.log(res);
        return res.ok;
      }),
      catchError(error => {
        // Atrapar cualquier error lanzado, y en su lugar lanzar un Observable con valor de false
        return of(false);
      })
    );
  }

  logout(): void {
    // Borrar el token de localStorage
    localStorage.removeItem('token');
    // Cerrar sesión en Google Sign in
    this.auth2.signOut().then(() => {
      // En este punto necesitamos redireccionar.
      // Pero al tratarse de una tarea que viene de una librería externa en angular (Promesa), es necesario indicarle a Angular que no pierda el control del cliclo de vida
      this.ngZone.run(() => {
        this.rotuer.navigateByUrl('/auth/login');
      })
    });
  }

  // Función que inicializa el Google Sign in API
  startApp(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // gapi esta declarado a nivel global en el script Platform.js de Google Sign In
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '689500073926-bmqaoupnfdigj6hn3k58mlth5v98b32s.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        // Resolver promesa, el gAPI ya se inicializó
        resolve();
      });
    })

  };

}
