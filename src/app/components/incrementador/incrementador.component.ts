import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // Recibir valor de entrada desde el componente padre, si no hay valor, colocar uno por defecto
  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';

  // Emitir un evento personalizado al padre para enviarle un valor desde el componente hijo
  @Output() valorActual: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // Agregar clases adicionales a nuestro elemento de entrada
    this.btnClass = `btn ${this.btnClass}`
  }

  // Controlar el valor actual en la barra de progreso (evitar que se desborde)
  cambiarValor(valor: number): number {
    if (this.progreso >= 100 && valor >= 0 ) {
      this.valorActual.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor <= 0 ) {
      this.valorActual.emit(0);
      return this.progreso = 0;
    }

    this.progreso += valor;
    this.valorActual.emit(this.progreso)
    return this.progreso
  }

}
