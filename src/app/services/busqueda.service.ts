import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BusquedaHospitalesRequest } from '../interfaces/busqueda-hospitales-request';
import { BusquedaUsuariosRequest } from '../interfaces/busqueda-usuarios-request';
import { Hospital } from '../models/hospital.model';
import { Usuario } from '../models/usuario.model';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

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

  // Convertidor de coleccion de instancias (para ver el contenido de la imagen)
  private generarColeccionInstancias(usuarios: Usuario[]) {
    return usuarios.map(usuario => new Usuario(usuario.nombre, usuario.email, usuario.password, usuario.role, usuario.img, usuario.uid, usuario.google));
  }

  // Buscador por colección
  buscar(coleccion: 'usuarios'|'medicos'|'hospitales', termino: string): Observable<Usuario[] | Hospital[]> {
    const URL = `${ BASE_URL }/todo/coleccion/${ coleccion }/${ termino }`;
    return this.http.get<Usuario[] | Hospital[]>(URL, this.headers).pipe(
      map((res: BusquedaUsuariosRequest | BusquedaHospitalesRequest | any) => {
        switch(res.coleccion) {
          case 'usuarios':
            // Retornar coleccion de instancias de usuario
            return this.generarColeccionInstancias(res.resultados);
          case 'hospitales':
            return res.resultados;
          default:
            return [];
        }
      })
    )
  }
}
