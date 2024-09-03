import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserServiceService } from '../../../../../services/user-service.service';
import { AlumnosService } from '../../../../../services/dbQuerys/alumnos.service';
import { AlumnoComponent } from '../../../../../entities/Alumnos/alumno/alumno.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaService } from '../../../../../services/dbQuerys/reserva.service';

@Component({
  selector: 'app-consulta-raciones',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule ,FormsModule, ReactiveFormsModule],
  templateUrl: './consulta-raciones.component.html',
  styleUrl: './consulta-raciones.component.css'
})
export class ConsultaRacionesComponent {
  userLoginOn:boolean=false;
  constructor(private userService:UserServiceService,private route:Router,private alumnoService:AlumnosService,private reservaService:ReservaService) { }
  ListaAlumnos?:AlumnoComponent[]
  formGroupDel:FormGroup = new FormGroup({})
  formGroupSearch:FormGroup = new FormGroup({})
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
    this.getAlumnos()
    this.formGroupSearch = new FormGroup({
      tosearch : new FormControl('')
    }

    )
    this.formGroupDel = new FormGroup(
      {
        idReserva : new FormControl('',Validators.required)
      }
    )
  }

  goSearch() : void {
    const rgexToSearch  = this.formGroupSearch.value.tosearch.toString();
    console.log(rgexToSearch)
  }
  
  getAlumnos():void {
    this.alumnoService.list().subscribe(
      data => {
        if (data){
          this.ListaAlumnos = data.filter(alumnos => alumnos.reservas?.length!=0);
          console.log(this.ListaAlumnos)
        }
      },
      error =>{
        console.log(error)
      }
    )
  }
  eliminarReserva(idReserva: any,idalumno:any): void {
    console.log(idReserva)
  //  this.formGroupDel.controls['idReserva'].setValue(parseInt(idReserva));
    this.reservaService.DeleteById(idalumno,idReserva).subscribe(
        data=>{
          try {
            if (data){
              console.log(data)
              this.getAlumnos()
            }
          } catch (e) {
            console.log(e)
            this.getAlumnos()
          }
        }
      
    )
    this.getAlumnos()
  }
}
