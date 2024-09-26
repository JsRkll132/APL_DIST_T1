import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserServiceService } from '../../../../../services/user-service.service';
import { TurnoService } from '../../../../../services/dbQuerys/turno.service';
import { TurnoComponent } from '../../../../../entities/turnos/turno/turno.component';
import { FormsModule, ReactiveFormsModule ,FormGroup, Validators, FormControl} from '@angular/forms';
import { RacionService } from '../../../../../services/dbQuerys/racion.service';
import { PlatoService } from '../../../../../services/dbQuerys/plato.service';
import { MenuService } from '../../../../../services/dbQuerys/menu.service';
import { MenuComponent } from '../../../../../entities/Menus/menu/menu.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-raciones',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './raciones.component.html',
  styleUrl: './raciones.component.css'
})
export class RacionesComponent {
  userLoginOn:boolean=false;
  public turnos:TurnoComponent[] = [];
  selectMenu?:MenuComponent;
  public menus :MenuComponent[] = [];
  formGroup : FormGroup = new FormGroup({});
  constructor(private userService:UserServiceService,private route:Router,private turnoService:TurnoService,
    private racionService:RacionService,private platosService:PlatoService,private menuService:MenuService) { }
 
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
      numeroRaciones:new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      idMenu : new FormControl(''),
      idPlato:new FormControl('',Validators.required),
      idTurno:new FormControl('',Validators.required),
      estadoRacion:new FormControl('')
      
    }
    )
    this.getTurnos();
    //this.getPlatos();
    this.getMenus();
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
  /*
  getPlatos() : void{
    this.platosService.list().subscribe(
      data=>{
        this.menus = data;
      },
      error =>{
        console.log('Error al obtener la lista de platos...'+error)
      }
    )
  }*/
  
  getMenus() : void{
    this.menuService.getAll().subscribe(
      data => {
        this.menus = data;
        console.log(this.menus)
      },
      error =>{
        console.log('Error al cargar los menus disponibles..');
      }
    )
  }

  saveRaciones():void{
    if (this.formGroup.valid){
    const numeroRaciones = parseInt(this.formGroup.get('numeroRaciones')?.value);

    for (let i = 0; i < numeroRaciones; i++) {
      const request = { 
        idMenu : parseInt(this.formGroup.get('idMenu')?.value),
        idPlato: parseInt(this.formGroup.get('idPlato')?.value),
        idTurno: parseInt(this.formGroup.get('idTurno')?.value),
        tipoRacion :this.selectMenu?.nombreMenu,
        estadoRacion: true
      };

      this.racionService.create(request).subscribe(
        response => {
          console.log('Ración creada:', response);
        },
        error => {
          console.error('Error al crear la ración:', error);
        }
      );
    }
    //alert("Raciones Ingresadas")
    const alert_ = Swal.mixin({
      customClass : {
          confirmButton : 'btn btn-primary'
      },
      buttonsStyling: false
    }

    )
    alert_.fire({
      icon: "success",
      title: "Transaccion exitosa",
      text: "Turno creado de manera exitosa...",
    
    });
    
  }else{
    //alert("Error en llenar los campos..");
    const alert_ = Swal.mixin({
      customClass : {
          confirmButton : 'btn btn-primary'
      },
      buttonsStyling: false
    }

    )
    alert_.fire({
      icon: "error",
      title: "Error en la transaccion",
      text: "Error en llenar los campos.",
    
    });
  }
  }

 selectedMenu(){
  this.getMenus()
  const selectid = this.formGroup.value.idMenu;
    this.selectMenu = this.menus.filter(menus => menus.idMenu == selectid)[0];
 }
}
