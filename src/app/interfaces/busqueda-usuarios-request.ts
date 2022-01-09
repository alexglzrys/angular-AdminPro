import { Usuario } from "../models/usuario.model";

export interface BusquedaUsuariosRequest {
  ok: boolean;
  coleccion: string;
  resultados: Usuario[]
}
