// Se recomienda usar clases (modelos) cuando necesitamos que nuestra interfaz incluya métodos que hagan algo con su información

interface HospitalUsuario {
  _id: string;
  nombre: string;
  img: string;
}

export class Hospital {
  constructor(
    public _id: string,
    public nombre: string,
    public img?: string,
    public usuario?: HospitalUsuario
  ) { }
}
