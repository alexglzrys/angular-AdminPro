import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  // Los métodos de un servicio se pueden declarar asincronos
  // Para subir imagenes se requiere el archivo, el tipo (en este caso solo hay tres opciones), y el id del documento a actualizar
  async actualizarFoto(archivo: File, tipo: 'usuarios'|'medicos'|'hospitales', id: string): Promise<any> {
    try {
      const URL = `${ BASE_URL }/uploads/${ tipo }/${ id }`;
      // Construir el cuerpo de la petición (adjuntar la imagen)
      const formData = new FormData();
      formData.append('imagen', archivo);

      // Se puede usar la API Fetch de JS sin problema alguno dentro de Angular, pero se recomienda usar
      // ante todo siempre el HTTP Module
      const respuesta = await fetch(URL, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      const data = await respuesta.json();

      return data;
    } catch (error) {
      console.log(error);

      return false;
    }
  }


  // fileUpload(fileItem: File, tipo: string, id: string) {
  //   const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
  //   const formData: FormData = new FormData();
  //   formData.append('imagen', fileItem, fileItem.name);
  //   return this.http.put(url, formData, { reportProgress: true });

      // return this.http.put( url, formData, {
      //   headers: {
      //     'x-token': localStorage.getItem('token') || ''
      //   }
      // })

  // }

}
