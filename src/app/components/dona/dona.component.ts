import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() titulo: string = 'Sin título';
  @Input() etiquetas: string[] = [];
  @Input() data!: number[];
  @Input() colores!: string[];

  // Doughnut
  public colors!: Color[]
  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType!: ChartType;

  constructor() {

  }

  ngOnInit(): void {
    this.doughnutChartType = 'doughnut';
    this.doughnutChartData = {
      labels: this.etiquetas,
      datasets: [
        { data: this.data, backgroundColor: this.colores }
      ],
    };

    //console.log(this.etiquetas)
  }

}
