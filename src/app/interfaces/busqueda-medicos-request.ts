import { Medico } from "../models/medico.model";

export interface BusquedaMedicosRequest {
  ok: boolean;
  coleccion: string;
  resultados: Medico[]
}
