import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progreso: number = 50;

  // Retornar valor del ancho en porcentaje
  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  constructor() { }

  ngOnInit(): void {
  }



}
