import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { RegisterUserForm } from '../interfaces/register-user-form';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

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

}
