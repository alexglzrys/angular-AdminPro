import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  progreso: number = 50;

  // Retornar valor del ancho en porcentaje
  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  constructor() { }

  ngOnInit(): void {
  }

  // Controlar el valor actual en la barra de progreso (evitar que se desborde)
  cambiarValor(valor: number): number {
    if (this.progreso >= 100 && valor >= 0 ) {
      return this.progreso = 100
    }

    if (this.progreso <= 0 && valor <= 0 ) {
      return this.progreso = 0
    }

    return this.progreso += valor;
  }

}
