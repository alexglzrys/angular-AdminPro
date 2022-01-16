/**
 * Un modelo en Angular representa una instancia de documento (modelo) en MongoDB
 * por tanto debe contener las mismas propiedades
 *
 * Siempre las propiedades opcionales se dejan al final y se debe especificar el ? de TS
 */

import { environment } from "src/environments/environment";

const API_URL = environment.base_url;
export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public role?: 'USER_ROLE' | 'ADMIN_ROLE',
    public img?: string,
    public uid?: string,
    public google?: boolean
  ) { }

  public print(): string {
    return `${this.nombre} - ${this.email}`;
  }

  get getImageUrl(): string {
    // Imagen de red social, ya contiene toda la ruta
    if (this.google) {
      return this.img!;
    }
    // Imagen de perfil de usuario, es necesario componer toda la ruta
    if (this.img) {
      return `${ API_URL }/uploads/usuarios/${this.img}`;
    } else {
      return `${ API_URL }/uploads/usuarios/no-image.jpg`;
    }
  }
}
