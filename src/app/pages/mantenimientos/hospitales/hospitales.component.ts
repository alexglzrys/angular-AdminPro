import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public loader: boolean = false;
  private subNuevaImagen!: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.subNuevaImagen.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales()
    // Suscribirme al evento que indica que se ha actualizado una imagen
    this.subNuevaImagen = this.modalImagenService.nuevaImagen.pipe(delay(500)).subscribe(img => {
      this.cargarHospitales()
    });
  }

  cargarHospitales() {
    this.loader = true;
    this.hospitalService.getHospitales().subscribe(hospitales => {
      this.hospitales = hospitales;
    }, err => {
      console.log(err);
    }, () => {
      this.loader = false;
    })
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe(res => {
      Swal.fire('Actualizado', 'El hospital se actualizó correctamente', 'success');
    })
  }

  eliminar(hospital: Hospital) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Realmente deseas eliminar a ${ hospital.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.eliminarHospital(hospital._id).subscribe(res => {
          Swal.fire('Eliminado', 'El hospital se eliminó correctamente', 'success');
          this.cargarHospitales();
        })
      }
    });
  }

  // Mostrar SweetAlert para ingresar información (Crear hospital)
  async mostrarSweetAlert() {
    // SweetAlert cuenta con varios componentes de alerta. En este caso, este es un prompt para ingresar información
    const { value: nombre } = await Swal.fire<string>({
      title: 'Registrar Hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Ingrese nombre del hospital',
      showCancelButton: true,
    })

    if (nombre?.trim().length) {
      this.hospitalService.registrarHospital(nombre).subscribe(res => {
        Swal.fire('Registrado', 'El hospital se registró correctamente', 'success');
        this.hospitales.push(res.hospital)
      })
    }
  }

  mostrarModal(hospital: Hospital) {
    // Llama al servicio de modal para mostrarlo en pantalla
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
    console.log(hospital)
  }


}
