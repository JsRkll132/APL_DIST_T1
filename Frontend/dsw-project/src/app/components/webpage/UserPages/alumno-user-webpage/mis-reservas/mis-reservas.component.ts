import { Component } from '@angular/core';
import { UserServiceService } from '../../../../../services/user-service.service';
import { Router } from '@angular/router';
import { AlumnosService } from '../../../../../services/dbQuerys/alumnos.service';
import { ReservaService } from '../../../../../services/dbQuerys/reserva.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservaComponent } from '../../../../../entities/Reservas/reserva/reserva.component';
import { AlumnoComponent } from '../../../../../entities/Alumnos/alumno/alumno.component';
import { AlumnoUserPanelComponent } from '../alumno-user-panel/alumno-user-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [FontAwesomeModule,RouterModule, RouterModule, CommonModule, AlumnoUserPanelComponent],
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent {
  userLoginOn: boolean = false;
  listaReservas?: ReservaComponent[];
  currAlumno?: AlumnoComponent;
  faTrash = faTrash;

  constructor(
    private userService: UserServiceService,
    private route: Router,
    private alumnoService: AlumnosService,
    private reservaService: ReservaService
  ) { }

  ngOnInit(): void {
    this.userService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (!this.userLoginOn) {
          this.route.navigateByUrl("/IniciarSesion/Alumno");
        }
      }
    });
    this.loadAlumno();
  }

  // Primero cargamos al alumno
  loadAlumno(): void {
    this.alumnoService.getById(this.userService.myuserData).subscribe(
      data => {
        this.currAlumno = data;
        this.loadReservas(); // Llamamos a loadReservas solo cuando tenemos los datos del alumno
      },
      error => {
        console.error('Error al cargar el alumno:', error);
      }
    );
  }

  // Luego, cargamos las reservas del alumno
  loadReservas(): void {
    if (this.currAlumno?.id) {  // Aseguramos que currAlumno tiene el ID antes de hacer la llamada
      this.reservaService.listByAlumno(this.currAlumno.id.toString()).subscribe(
        data => {
          if (data) {
            this.listaReservas = data;
            console.log(this.listaReservas);
          }
        },
        error => {
          console.error('Error al cargar las reservas:', error);
        }
      );
    } else {
      console.error('El ID del alumno no está definido.');
    }
  }
  eliminarReserva(idReserva: any,idalumno:any): void {
    console.log(idReserva)
  //  this.formGroupDel.controls['idReserva'].setValue(parseInt(idReserva));
    this.reservaService.DeleteById(idalumno,idReserva).subscribe(
        data=>{
          try {
            if (data){
              console.log(data)
              this.loadReservas()
            }
          } catch (e) {
            console.log(e)
          }
        }
      
    )

  }
}
