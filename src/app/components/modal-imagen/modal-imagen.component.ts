import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  imagenCargada!: File;
  imagenTemporal!: string | null | ArrayBuffer;

  // Inyecto el servicio de forma pública para tener acceso al mismo desde la vista
  constructor(public modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalImagenService.cerrarModal();
  }

  // Este metodo se dispara cuando el control de archivos (file), cambia su valor (se carga una imagen)
  cargarImagen(event: any): void | null {
    // Obtener la referencia hacia la imagen (toda su información)
    this.imagenCargada = event.target.files[0];

    // No se selecciono imagen, por tanto no hay nada que mostrar
    if (!this.imagenCargada) return this.imagenTemporal = null;

    // Mostrar vista previa imagen seleccionada en base64
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenCargada);
    reader.onloadend = () => {
      this.imagenTemporal = reader.result;
    }
  }

}
