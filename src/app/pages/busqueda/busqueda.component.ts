import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];
  public usuarios: Usuario[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private busquedaService: BusquedaService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({termino}) => {
      this.busquedaService.buscadorGeneral(termino).subscribe(res => {
        // Llenar listado independiente de resultados
        this.medicos = res.medicos;
        this.usuarios = res.usuarios;
        this.hospitales = res.hospitales;
      })
    })
  }

  verMedico(medico: Medico) {
    // Navegar a más información del médico seleccionado
    this.router.navigateByUrl('dashboard/medico/' + medico._id);
  }

}
