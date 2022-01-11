import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  medicos: Medico[] = [];
  loader: boolean = false;

  private medicosTemp: Medico[] = [];

  constructor(private medicoService: MedicoService,
              private busquedaService: BusquedaService) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.loader = true;
    this.medicoService.getMedicos().subscribe(medicos => {
      this.medicos = medicos;
      this.medicosTemp = medicos;
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


}
