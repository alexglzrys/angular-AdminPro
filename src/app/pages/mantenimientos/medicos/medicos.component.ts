import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  medicos: Medico[] = [];
  loader: boolean = false;
  medicosTotales: number = 0;

  private medicosTemp: Medico[] = [];
  private subsNuevaImagen!: Subscription;
  private desde: number = 0;

  constructor(private medicoService: MedicoService,
              private busquedaService: BusquedaService,
              private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.subsNuevaImagen.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.subsNuevaImagen = this.modalImagenService.nuevaImagen.pipe(delay(1000)).subscribe(img => {
      this.cargarMedicos();
    })
  }

  cargarMedicos() {
    this.loader = true;
    this.medicoService.getMedicos(this.desde).subscribe(res => {
      this.medicos = res.medicos;
      this.medicosTemp = res.medicos;
      this.medicosTotales = res.total;
    },
    err => {

    },
    () => {
      this.loader = false;
    })
  }

  buscar(termino: string): boolean | void {
    if (termino.trim().length === 0) {
      // LLeno la tabla con la ultima carga de hospitales
      this.medicos = this.medicosTemp;
      return;
    }
    this.busquedaService.buscar('medicos', termino).subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    })
  }

  // Hacer una nueva petición de medicos si el valor del paginador cambia
  cambiarPagina(valor: number): boolean | void {
    this.desde += valor;
    // Evitar desbordamientos
    if (this.desde < 0) {
      this.desde = 0;
      return;
    } else if (this.desde >= this.medicosTotales) {
      this.desde -= valor;
      return;
    }

    this.cargarMedicos();
  }

  eliminar(medico: Medico) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Realmente deseas eliminar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico).subscribe(res => {
          Swal.fire('Eliminado', 'El médico se eliminó correctamente', 'success');
          this.cargarMedicos();
        })
      }
    });
  }

  mostrarModal(medico: Medico) {
    // Llama al servicio de modal para mostrarlo en pantalla
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img);
  }
}
