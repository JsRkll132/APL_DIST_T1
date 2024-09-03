import { Component } from '@angular/core';
import { RacionComponent } from '../../Raciones/racion/racion.component';
import { MenuComponent } from '../../Menus/menu/menu.component';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
    idReserva?: number
    racion?:RacionComponent
    menu?:MenuComponent
    aceptada?: boolean
    fechaReserva?:Date

}
