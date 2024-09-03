import { Component } from '@angular/core';
import { UserServiceService } from '../../../../../services/user-service.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TurnoComponent } from '../../../../../entities/turnos/turno/turno.component';
import { RacionComponent } from '../../../../../entities/Raciones/racion/racion.component';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../../../../../services/dbQuerys/turno.service';
import { ReservaService } from '../../../../../services/dbQuerys/reserva.service';
import { AlumnosService } from '../../../../../services/dbQuerys/alumnos.service';
import { RacionService } from '../../../../../services/dbQuerys/racion.service';

@Component({
  selector: 'app-visualizar-raciones',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule],
  templateUrl: './visualizar-raciones.component.html',
  styleUrl: './visualizar-raciones.component.css'
})
export class VisualizarRacionesComponent {
  userLoginOn:boolean=false;
  public turnos:TurnoComponent[] = [];
  public raciones:RacionComponent[] = [];
  public listaracionesAux:RacionComponent[] = [];
  public cupos_disp?:number;
  public idcurruser?:string;
  public currentAlumno?:any;
  public reservas_list:any[] = [];
  formGroup: any;
  constructor(private userService:UserServiceService,private route:Router,private turnoService:TurnoService,
    private racionService:RacionService,private alumnoService:AlumnosService,private reservaService:ReservaService) { }
 
  ngOnInit(): void {
    this.userService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        console.log(userLoginOn)
        this.userLoginOn=userLoginOn;
        if(this.userLoginOn==false || this.userService.userRole!='admint'){

          this.route.navigateByUrl("/IniciarSesion/Administrador");
        }
      }
    }
    )
  }
  getTurnos() : void{
    this.turnoService.list().subscribe(
      data =>{
        this.turnos =data;
      },
      error =>{
        console.log('Error al obtener la lista de turnos '+ error);
      }
    )
  }
  getRaciones(): void {
    this.racionService.list().subscribe(
      data => {
        this.raciones = data.filter(racion => racion.disponible==true);
        this.getCantidadAndChangeTable();
      },
      error => {
        console.log("Error en la carga de raciones" + error);
      }
    );
  }
  getCantidadAndChangeTable(): void {
    const idTurnoBuscado = parseInt(this.formGroup.get("idturno")?.value);
    console.log(idTurnoBuscado);
    if(idTurnoBuscado!=null){
      this.cupos_disp = this.raciones.filter(racion => racion.turno?.idTurno === idTurnoBuscado && racion.disponible==true).length;
      
      this.raciones = this.raciones.filter(racion => racion.turno?.idTurno === idTurnoBuscado);
    }
    
  }

}
