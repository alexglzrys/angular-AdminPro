/**
 * Un modelo en Angular representa una instancia de documento (modelo) en MongoDB
 * por tanto debe contener las mismas propiedades
 *
 * Siempre las propiedades opcionales se dejan al final y se debe especificar el ? de TS
 */

export class Usuario {

  constructor(
    private nombre: string,
    private email: string,
    private password?: string,
    private role?: string,
    private img?: string,
    private uid?: string,
    private google?: boolean
  ) { }

}
