import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.cargarHospitales();

    // Suscripicón al campo select (changes) para mostrar informaciónn del hospital seleccionado
    this.medicoForm.get('hospital')?.valueChanges.subscribe(hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find(hosp => hosp._id === hospitalId);
    });

    // Observar el parámetro de ruta (id) para saber si existe un id de médico
    this.activatedRoute.params.subscribe(({ id }) => {
      // ! Una manera para saber si hay fugas de memoria en los subscribes, es colocar console.log() para ver en consola si se muestran de forma exponencial si entramos y salimos de este componente
      // console.log('tick);

      if (id !== 'nuevo') {
        // Cargar información del médico seleccionado
        this.cargarMedicoSeleccionado(id);
      }
    })
  }

  cargarHospitales() {
    this.hospitalService.getAllHospitales().subscribe(hospitales => {
      this.hospitales = hospitales
    })
  }

  cargarMedicoSeleccionado(id: string) {
    this.medicoService.getMedicoById(id).subscribe(medico => {
      // Si es null, entonces no se encontro el médico solicitado
      if (!medico) {
        this.router.navigateByUrl('/dashboard/medicos');
      } else {
        this.medicoSeleccionado = medico;
        // Setear el nombre y hospital en los campos del formulario (tambien aplica con setValue())
        this.medicoForm.patchValue({nombre: medico.nombre, hospital: medico.hospital?._id});
      }
    })
  }

  registrar() {
    const { nombre } = this.medicoForm.value;
    // Verificar si se trata de un registro o actualización
    if (this.medicoSeleccionado) {
      const nuevaData = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(nuevaData).subscribe(res => {
        Swal.fire('Actualizado', `${nombre} fue actualizado correctamente en el sistema`, 'success');
      })
    } else {
      this.medicoService.registrarMedico(this.medicoForm.value).subscribe((res: any) => {
        Swal.fire('Registrado', `${nombre} fue registrado correctamente en el sistema`, 'success');
        // Redireccionar al usuario a esta misma ruta, pero con el id del médico registrado
        this.router.navigateByUrl(`dashboard/medico/${res.medico._id}`);
      });
    }
  }

}
