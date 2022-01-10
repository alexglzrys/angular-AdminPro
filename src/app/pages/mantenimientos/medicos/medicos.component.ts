import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
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

  constructor(private medicoService: MedicoService) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.loader = true;
    this.medicoService.getMedicos().subscribe(medicos => {
      this.medicos = medicos;
    },
    err => {

    },
    () => {
      this.loader = false;
    })
  }

}
