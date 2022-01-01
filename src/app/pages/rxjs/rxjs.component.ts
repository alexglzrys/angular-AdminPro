import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {
    /*let i = -1;

    // Generar el cuerpo de un Observable
    const obs$ = new Observable(observer => {

      const intervalo = setInterval(() => {
        console.log('tick');
        i++;
        // Emitir un valor a mi observer (quien se suscribió a este Observable)
        observer.next(i);

        // Un Observable es un flujo de datos infinito, por lo que debemos ser cuidadosos ya que esto genera desbordamientos de memoria (Se quedan trabajando en segundo plano, y cunado regresamos a la pagina o componente que se suscribe, se genera otro observable del mismo tipo, y así sucesivamente)
        // En estos casos se recomienda desuscribirnos.

        // si deseamos hacerlo finito debemos completar su flujo
        if (i === 4) {
          clearInterval(intervalo);
          // Completar el Observable (terminarlo)
          observer.complete();
        }

        // Un Observable puede lanzar un error, en este caso se termina de forma abrupta
        if (i === 2) {
          i = -1;
          console.warn('Upss error...')
          observer.error('Lo sentimos, detectamos un error interno');
        }

      }, 1000);
    })

    // Suscribirse al Observable para que comience a trabajar, de lo contrario no hace nada
    obs$.pipe(
      // Operador para reintentar en caso de error, si no hay parámetro se reintenta N veces
      retry(1)
    ).subscribe(
      data => console.log('Data: ', data),
      err  => console.error('Error', err),
      ()   => console.info('Completado')
    );*/

    // Generalmente en Angular nos vamos a conectar a servicios que retornen aobservables (que no son mas que funciones)
    this.retonrnaObservable()
        .pipe(retry(1))
        .subscribe(
          dat => console.log('Data: ', dat),
          err => console.error('Error: ', err),
          ()  => console.info('Completado')
        );
  }

  ngOnInit(): void {
  }

  // Una función que retorna un Observable de tipo numérico
  retonrnaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        console.log('tick');
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          i = -1;
          console.warn('Upss error...')
          observer.error('Lo sentimos, detectamos un error interno');
        }

      }, 1000);
    })
  }

}
