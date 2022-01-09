import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;

  // Información publica para mostrar o gestionar por el modal
  public coleccion!: string;
  public id!: string;
  public img!: string;
  // Evento Personalizado para notifcar a cualquier componente suscrito que una nueva imagen se ha actualizado
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  constructor() { }

  abrirModal(coleccion: 'usuarios'|'medicos'|'hospitales', id: string, img: string = 'no-image.jpg') {
    this.coleccion = coleccion;
    this.id = id;
    //console.log(img)
    // Verificar si la imagen es local o de alguna red social
    if (img.includes('https')) {
      this.img = img
    } else {
      this.img = `${ BASE_URL }/uploads/${ coleccion }/${ img }`;
    }
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
