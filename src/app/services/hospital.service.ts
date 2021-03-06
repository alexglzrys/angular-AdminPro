import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {



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

  getHospitales(desde: number): Observable<{hospitales: Hospital[], total: number}> {
    const URL = `${BASE_URL}/hospitales?desde=${desde}`;
    return this.http.get<{ ok: boolean, hospitales: Hospital[], total: number }>(URL, this.headers).pipe(
      delay(1000),
      map(res => {
        // Solo me interesa devolver el listado de hospitales
        return {
          hospitales: res.hospitales,
          total: res.total
        };
      })
    );
  }

  getAllHospitales(): Observable<Hospital[]> {
    const URL = `${BASE_URL}/hospitales/all`;
    return this.http.get<{ ok: boolean, hospitales: Hospital[]}>(URL, this.headers).pipe(
      delay(1000),
      map(res => {
        return res.hospitales
      })
    );
  }

  registrarHospital(nombre: string): Observable<any> {
    const URL = `${BASE_URL}/hospitales`;
    return this.http.post(URL, {nombre}, this.headers);
  }

  actualizarHospital(_id: string, nombre: string): Observable<any> {
    const URL = `${BASE_URL}/hospitales/${_id}`;
    return this.http.put(URL, {nombre}, this.headers);
  }

  eliminarHospital(_id: string): Observable<any> {
    const URL = `${BASE_URL}/hospitales/${_id}`;
    return this.http.delete(URL, this.headers);
  }


}
