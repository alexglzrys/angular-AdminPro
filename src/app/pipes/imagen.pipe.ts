import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  /**
   *
   * @param img : El nombre de la imagen asociada (el primer valor asignado)
   * @param tipo : El tipo de colección
   * @returns : La URL completa hacia el archivo
   */
  transform(img: string | undefined, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    // es necesario componer toda la ruta
    if (img) {
      return `${ API_URL }/uploads/${tipo}/${img}`;
    } else {
      return `${ API_URL }/uploads/${tipo}/no-image.jpg`;
    }
  }

}
