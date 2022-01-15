import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital | undefined;
  public medicoSeleccionado!: Medico

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router) { }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.cargarHospitales();

    // Suscripicón al campo select (changes) para mostrar informaciónn del hospital seleccionado
    this.medicoForm.get('hospital')?.valueChanges.subscribe(hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find(hosp => hosp._id === hospitalId);
    })
  }

  cargarHospitales() {
    this.hospitalService.getAllHospitales().subscribe(hospitales => {
      this.hospitales = hospitales
    })
  }

  registrar() {
    const { nombre } = this.medicoForm.value;
    this.medicoService.registrarMedico(this.medicoForm.value).subscribe((res: any) => {
      Swal.fire('Registrado', `${nombre} fue registrado correctamente en el sistema`, 'success');
      // Redireccionar al usuario a esta misma ruta, pero con el id del médico registrado
      this.router.navigateByUrl(`dashboard/medico/${res.medico._id}`);
    });
  }

}
