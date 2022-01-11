import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): object {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getMedicos(desde: number): Observable<{ medicos: Medico[], total: number }> {
    const URL = `${BASE_URL}/medicos?desde=${desde}`;
    return this.http.get<{ ok: boolean, medicos: Medico[], total: number }>(URL, this.headers).pipe(
      delay(1000),
      map(res => {
        // Solo me interesa devolver el listado de médicos
        return {
          medicos: res.medicos,
          total: res.total
        }
      })
    );
  }

  // Se puede mandar X información en el cuerpo de la petición.
  // Sin embargo, el backend solo tomará en cuenta la información que necesita
  registrarMedico(medico: Medico): Observable<any> {
    const URL = `${BASE_URL}/medicos`;
    return this.http.post(URL, medico, this.headers);
  }

  actualizarMedico(medico: Medico): Observable<any> {
    const URL = `${BASE_URL}/medicos/${medico._id}`;
    return this.http.put(URL, medico, this.headers );
  }

  eliminarMedico(medico: Medico): Observable<any> {
    const URL = `${BASE_URL}/medicos/${medico._id}`;
    return this.http.delete(URL, this.headers);
  }

}
