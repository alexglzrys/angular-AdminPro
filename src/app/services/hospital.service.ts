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

  getHospitales(): Observable<Hospital[]> {
    const URL = `${BASE_URL}/hospitales`;
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(URL, this.headers).pipe(
      delay(1000),
      map((res: { ok: boolean, hospitales: Hospital[] }) => {
        // Solo me interesa devolver el listado de hospitales
        return res.hospitales;
      })
    );
  }


}
