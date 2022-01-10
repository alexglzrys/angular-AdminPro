import { Hospital } from "../models/hospital.model";

export interface BusquedaHospitalesRequest {
  ok: boolean;
  coleccion: string;
  resultados: Hospital[]
}
