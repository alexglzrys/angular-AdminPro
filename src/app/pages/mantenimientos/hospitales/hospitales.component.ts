import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public loader: boolean = false;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.cargarHospitales()
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

}
