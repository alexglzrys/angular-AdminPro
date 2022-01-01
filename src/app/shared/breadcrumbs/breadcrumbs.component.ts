import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Data, Event, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  title: string = '';

  constructor(private router: Router) {
    this.getDataAdicionalRuta()
  }

  ngOnInit(): void {

  }

  getDataAdicionalRuta() {
    // Suscribirme a los eventos del router
    this.router.events
        .pipe(
          // Al entrar a una nueva ruta suceden muchos eventos, solo me interesa el ActivationEnd
          filter((event: any) => event instanceof ActivationEnd ),
          // Por cada router-outlet anidado, hay un evento de ActivationEnd, solo me interesa el que no sea el que no sea el primer hijo
          filter((event: ActivationEnd) => event.snapshot.firstChild === null ),
          // De ese evento solo me interesa obtener su data
          map((event: ActivationEnd) => event.snapshot.data)
        )
        .subscribe((data: Data) => {
          // Asignar titulo que viaja como data adicional en la ruta
          this.title = data.title
          document.title = `Angular AdminPro - ${this.title}`;
        })
  }

}
