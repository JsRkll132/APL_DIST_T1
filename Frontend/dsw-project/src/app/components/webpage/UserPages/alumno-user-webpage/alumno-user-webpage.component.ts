import { Component } from '@angular/core';
import { UserServiceService } from '../../../../services/user-service.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../../../../services/dbQuerys/turno.service';
import { TurnoComponent } from '../../../../entities/turnos/turno/turno.component';
import { RacionComponent } from '../../../../entities/Raciones/racion/racion.component';
import { RacionService } from '../../../../services/dbQuerys/racion.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnosService } from '../../../../services/dbQuerys/alumnos.service';
import { ReservaService } from '../../../../services/dbQuerys/reserva.service';
import { MenuService } from '../../../../services/dbQuerys/menu.service';
import { MenuComponent } from '../../../../entities/Menus/menu/menu.component';

@Component({
  selector: 'app-alumno-user-webpage',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule , FormsModule, ReactiveFormsModule],
  templateUrl: './alumno-user-webpage.component.html',
  styleUrl: './alumno-user-webpage.component.css'
})
export class AlumnoUserWebpageComponent {
  userLoginOn:boolean=false;
  public turnos:TurnoComponent[] = [];
  public raciones:RacionComponent[] = [];
  public listaracionesAux:RacionComponent[] = [];
  public menus:MenuComponent[] = [];
  public cupos_disp?:number;
  public idcurruser?:string;
  public currentAlumno?:any;
  public reservas_list:any[] = [];
  curr_menu?:MenuComponent;
  public iter = 0;
  formGroup : FormGroup = new FormGroup({});
  formGroupReserva : FormGroup = new FormGroup({});
  constructor(private userService:UserServiceService,private route:Router,private turnoService:TurnoService,
    private racionService:RacionService,private alumnoService:AlumnosService,private reservaService:ReservaService,private menuService:MenuService) { }
  ngOnInit(): void {
    this.userService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        console.log(userLoginOn)
        this.userLoginOn=userLoginOn;
        if(this.userLoginOn==false){
          this.route.navigateByUrl("/IniciarSesion/Alumno");
        }
      }
    }
    )
    this.formGroup = new FormGroup({

      idturno:new FormControl('',Validators.required),
      idMenu : new FormControl('',Validators.required)
    }
    )
    this.loadAlumno();
    this.getTurnos();
    this.getRaciones();
    this.loadReservas();
    this.getMenus();
    this.formGroupReserva = new FormGroup(
      {
        idracion:new FormControl("",Validators.required)
      }
    )

  }
    
  logout():void{
    this.userService.logout();

    this.route.navigateByUrl("")
    window.localStorage.clear()
   // window.location.reload()
    
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

  getMenus(): void {
    this.menuService.getAll().subscribe(
      data => {
        this.menus = data
        this.getCantidadAndChangeTable();
      },
      error => {
        console.log("Error en la carga de raciones" + error);
      }
    );
  }
  selectMenu():void{
      this.getMenus();
      this.curr_menu = this.menus.filter(menu => menu.idMenu == parseInt(this.formGroup.value.idMenu))[0]
      console.log(this.curr_menu)
  }
  getCantidadAndChangeTable(): void {
    const idTurnoBuscado = parseInt(this.formGroup.get("idturno")?.value);
    const idMenuBuscado = parseInt(this.formGroup.get("idMenu")?.value)
    console.log(idTurnoBuscado);
    console.log(idMenuBuscado);
    if(idTurnoBuscado!=null){
      this.cupos_disp = this.raciones.filter(racion => racion.turno?.idTurno === idTurnoBuscado && racion.disponible==true ).length;
      
      this.raciones = this.raciones.filter(racion => racion.turno?.idTurno === idTurnoBuscado);
    }
    
  }

  onSelectChange(): void {
    this.getRaciones();
  }
  loadAlumno():void{
    this.alumnoService.getById(this.userService.myuserData).subscribe( data =>{
      if (data){
        this.currentAlumno=data;
      }
    }
    )
  }

  makeReserva():void{
    //if (this.iter==0){
      if(this.formGroupReserva.valid){
        const request = {
          idalumno :this.currentAlumno.id,
          idracion : parseInt(this.formGroupReserva.get("idracion")?.value)
           }
        var added = false;
        this.reservaService.Create(request).subscribe(
          {
          next:(data) =>{
            if(data){
              console.log(data);
              added = true;
            }else{
              alert("Ya cuenta con reserva hecha para este menu")
              
            }
          },
          error:(errordata) =>{
            console.log(errordata)
            alert("Ocurrio un error")
          },
          complete:() =>{
            this.formGroupReserva.reset
            this.formGroup.reset
            if (added){
              alert("Reserva realizada de manera exitosa")
            }
           
            this.getRaciones()
          }
          }
        )
      }else{
        alert("Campos incompletos.")
      }
  //  }else{
  //    alert("Ya cuenta con una reserva hecha");
    //}
    
  }
  selectTurno(idracion: any): void {
    this.formGroupReserva.get('idracion')?.setValue(idracion);
    console.log(this.formGroupReserva.get("idracion")?.value)
  }

  loadReservas(){
    this.reservaService.list().subscribe(data =>
      {
        if (data){
          this.reservas_list = data
        }
      }
    )
  }
}
