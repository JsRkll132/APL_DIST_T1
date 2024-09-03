import { Component } from '@angular/core';
import { PlatoComponent } from '../../Platos/plato/plato.component';
import { TurnoComponent } from '../../turnos/turno/turno.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  idMenu?:number
  nombreMenu?:string
  platos?:PlatoComponent[]
  turnos?:TurnoComponent[]

}
