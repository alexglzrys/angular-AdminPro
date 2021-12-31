import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // Recibir valor de entrada desde el componente padre, si no hay valor, colocar uno por defecto
  @Input('progreso_actual') progreso: number = 50;

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
