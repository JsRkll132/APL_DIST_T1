import { Component } from '@angular/core';
import { MenuComponent } from '../../Menus/menu/menu.component';
import { PlatoComponent } from '../../Platos/plato/plato.component';
import { TurnoComponent } from '../../turnos/turno/turno.component';

@Component({
  selector: 'app-racion',
  standalone: true,
  imports: [],
  templateUrl: './racion.component.html',
  styleUrl: './racion.component.css'
})
export class RacionComponent {
  idRacion?: number
  tipoRacion?: string
  menu?: MenuComponent
  plato?:PlatoComponent
  turno?:TurnoComponent
  disponible?:boolean
}
