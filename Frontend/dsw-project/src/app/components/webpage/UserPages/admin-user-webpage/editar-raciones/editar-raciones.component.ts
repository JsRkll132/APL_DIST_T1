import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserServiceService } from '../../../../../services/user-service.service';
import { RacionService } from '../../../../../services/dbQuerys/racion.service';
import { AlumnosService } from '../../../../../services/dbQuerys/alumnos.service';
import { TurnoService } from '../../../../../services/dbQuerys/turno.service';
import { ReservaService } from '../../../../../services/dbQuerys/reserva.service';
import { MenuService } from '../../../../../services/dbQuerys/menu.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurnoComponent } from '../../../../../entities/turnos/turno/turno.component';
import { RacionComponent } from '../../../../../entities/Raciones/racion/racion.component';
import { MenuComponent } from '../../../../../entities/Menus/menu/menu.component';

@Component({
  selector: 'app-editar-raciones',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './editar-raciones.component.html',
  styleUrl: './editar-raciones.component.css'
})
export class EditarRacionesComponent {
  userLoginOn:boolean=false;
  public turnos:TurnoComponent[] = [];
  public raciones:RacionComponent[] = [];
  public listaracionesAux:RacionComponent[] = [];
  public menus:MenuComponent[] = [];
  public cupos_disp?:number;
  public idcurruser?:string;
  public reservas_list:any[] = [];
  curr_menu?:MenuComponent;
  conunt_total ?:any
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
        if(this.userLoginOn==false || this.userService.userRole!='admint'){

          this.route.navigateByUrl("/IniciarSesion/Administrador");
        }
      }
    }
    )
    this.formGroup = new FormGroup({

      idturno:new FormControl('',Validators.required),
      idMenu : new FormControl('',Validators.required),
      idPlato : new FormControl('',Validators.required)
    }
    )
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
        this.conunt_total = data.filter(racion => racion.disponible==true).length
        this.raciones = data.filter(racion => racion.disponible==true);
      //  if((this.formGroup.get("idturno")?.value==null && this.formGroup.get("idMenu")?.value==null && this.formGroup.get("idPlato")?.value==null)){
          this.getCantidadAndChangeTable()

        
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
    const idPlatoBuscado = parseInt(this.formGroup.get("idPlato")?.value)
    console.log(idTurnoBuscado);
    console.log(idMenuBuscado);
    if(idTurnoBuscado!=null){ 
      this.cupos_disp = this.raciones.filter(racion => racion.plato?.idPlato==idPlatoBuscado && racion.turno?.idTurno === idTurnoBuscado && racion.disponible==true && racion.plato?.idPlato == idPlatoBuscado).length;
      
      this.raciones = this.raciones.filter(racion =>  racion.plato?.idPlato==idPlatoBuscado && racion.turno?.idTurno === idTurnoBuscado  && racion.plato?.idPlato == idPlatoBuscado);
    }
    
  }

  onSelectChange(): void {
    this.getRaciones();
  }

  makeReserva():void{
    //if (this.iter==0){
      if(this.formGroupReserva.valid){
        const request = {
      //    idalumno :this.currentAlumno.id,
          idracion : parseInt(this.formGroupReserva.get("idracion")?.value)
           }
        this.reservaService.Create(request).subscribe(
          {
          next:(data) =>{
            if(data){
              console.log(data);
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

           
            this.getRaciones()
          }
          }
        )
      }else{
        alert("Campos incompletos.")
      }
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

  deletedSelectedRations():void{
    this.getRaciones()
      const id_racion = this.formGroupReserva.value.idracion;
      console.log(id_racion)
      if (id_racion){
        this.racionService.delete(id_racion.toString()).subscribe(
          data=>{
            if (data){
              console.log(data)
              alert("Racion eliminada del sistema")
              this.getRaciones()
            }
          }
        );
      }

}

  deletedFiltertedRations():void{
      this.getRaciones()
      const aux_list = this.raciones
      aux_list.forEach(racion => {
        if (racion.idRacion){
          this.racionService.delete(racion.idRacion.toString()).subscribe(
            data=>{
              if (data){
                console.log(data)
                this.getRaciones()
              }
            }
          );
        }
         
      })
  }
}
