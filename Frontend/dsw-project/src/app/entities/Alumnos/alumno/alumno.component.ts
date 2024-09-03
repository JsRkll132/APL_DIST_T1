import { Component } from '@angular/core';
import { ReservaComponent } from '../../Reservas/reserva/reserva.component';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent {
    id?:number
    alumnoNombre?:string
    alumnoNombre2?:string
    alumnoApellido1?:string
    alumnoApellido2?:string
    alumnoCorreo?:string
    alumnoCorreoPersonal?:string
    reservas?:ReservaComponent[]
}
