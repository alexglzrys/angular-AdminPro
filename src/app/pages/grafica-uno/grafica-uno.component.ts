import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-grafica-uno',
  templateUrl: './grafica-uno.component.html',
  styles: [
  ]
})
export class GraficaUnoComponent implements OnInit {

  labels_g1: string[] = ['Enero', 'Febrero', 'Marzo'];
  labels_g2: string[] = ['Gasolina', 'Viáticos', 'Pasajes'];
  labels_g3: string[] = ['IT', 'Marketing', 'Diseño'];

  data_g1: number[] = [2500, 3900, 1500];
  data_g2: number[] = [6900, 1500, 250];
  data_g3: number[] = [95900, 45200, 63500];

  color_g1: string[] = ['#FF1744', '#2979FF', '#FF9100'];
  color_g2: string[] = ['#42A5F5', '#4CAF50', '#FDD835'];
  color_g3: string[] = ['#FB8C00', '#7B1FA2', '#3949AB'];

  constructor() { }

  ngOnInit(): void {
  }

}
