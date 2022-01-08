import { Usuario } from "../models/usuario.model";

export interface GetUsuariosRequest {
  ok: boolean,
  usuarios: Usuario[],
  total: number
}
