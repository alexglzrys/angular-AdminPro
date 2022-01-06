import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUserForm } from '../interfaces/register-user-form';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  registrarUsuario(formData: RegisterUserForm): Observable<any> {
    const URL = `${ BASE_URL }/usuarios`;
    return this.http.post(URL, formData);
  }

}
