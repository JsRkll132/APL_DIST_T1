import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserServiceService } from '../../../../../services/user-service.service';
import { PlatoService } from '../../../../../services/dbQuerys/plato.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlatoComponent } from '../../../../../entities/Platos/plato/plato.component';
import { TurnoService } from '../../../../../services/dbQuerys/turno.service';
import { TurnoComponent } from '../../../../../entities/turnos/turno/turno.component';
import { MenuService } from '../../../../../services/dbQuerys/menu.service';
import { MenuComponent } from '../../../../../entities/Menus/menu/menu.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-menu',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './editar-menu.component.html',
  styleUrl: './editar-menu.component.css'
})
export class EditarMenuComponent {
  userLoginOn:boolean=false;
  selectedPlatoEdit?:PlatoComponent;
  selectedMenu?:MenuComponent;
  platosList:PlatoComponent[] = []
  turnosList:TurnoComponent[] = []
  menuList:MenuComponent[] = []
  constructor(private userService:UserServiceService,private route:Router,private platoService:PlatoService,private turnoService:TurnoService
    ,private menuService:MenuService) { }
  formAddPlato:FormGroup = new FormGroup({})
  formAddTurno:FormGroup = new FormGroup({})
  formAddMenu:FormGroup = new FormGroup({})
  mostrarSelect: boolean = false; 
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
    this.loadTurnos()
    this.loadPlatos()
    this.loadMenus()
    this.formAddPlato = new FormGroup({
      idPlato : new FormControl('',),
      nombrePlato: new FormControl('', Validators.required),
      kcalPlato: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+([eE][+]?[0-9]+)?$')]),
      pesoPlato: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+([eE][+]?[0-9]+)?$')]),
    });
    this.formAddTurno = new FormGroup({
      nombreturno: new FormControl('', Validators.required),
      horaInicio: new FormControl('',Validators.required),
      horaFin: new FormControl('',Validators.required),
    });
    this.formAddMenu = new FormGroup({
      nomnbreMenu: new FormControl(''),
      idMenu: new FormControl('',Validators.required),
      idPlato: new FormControl(''),
      idTurno: new FormControl('')
    });
  }
  addMenuPlato() : void{
    if (this.formAddMenu.value.idMenu!=null && this.formAddMenu.value.idPlato!=null){
      const request = {
        nomnbreMenu:null,
        idMenu: this.formAddMenu.get('idMenu')?.value,
        idPlato: this.formAddMenu.get('idPlato')?.value,
        idTurno:null
      }
      console.log(request)
      
      this.menuService.addPlatos(request).subscribe(
        response => {
          console.log('Plato introducido :', response);
          //alert('Plato agregado al menu ...');
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
            text: "Plato agregado al menu",
          
          });
          this.formAddMenu.reset()
          this.loadMenus()
        },
        error => {
          console.error('Error al crear el turno:', error);
        },
      )
  }else{
    //alert("Campos vacios o erroneos")
    const alert_ = Swal.mixin({
      customClass : {
          confirmButton : 'btn btn-danger'
      },
      buttonsStyling: false
    }

    )
    alert_.fire({
      icon: "error",
      title: "Incompleto",
      text: "Campos vacios o erroneos",
    
    });
  }
  }
  deleteMenuPlato() : void{

    Swal.fire({
      title: "Seguro que desea eliminar ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar Operacion`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {    if (this.formAddMenu.value.idMenu!=null && this.formAddMenu.value.idPlato!=null){
        const request = {
          nomnbreMenu:null,
          idMenu: this.formAddMenu.get('idMenu')?.value,
          idPlato: this.formAddMenu.get('idPlato')?.value,
          idTurno:null
        }
        console.log(request)
        
        this.menuService.DeletePlatos(request).subscribe(
          response => {
            console.log('Plato eliminado :', response);
            //alert('Plato eliminado menu ...');
            Swal.fire("Plato eliminado menu ...", "", "success");
            this.formAddMenu.reset()
            this.loadMenus()
          },
          error => {
            console.error('Error al eliminar plato del menu:', error);
          },
        )
    }else{
      const alert_ = Swal.mixin({
        customClass : {
            confirmButton : 'btn btn-danger'
        },
        buttonsStyling: false
      }
  
      )
      alert_.fire({
        icon: "error",
        title: "Incompleto",
        text: "Campos vacios o erroneos",
      
      });
    }
        
      } else if (result.isDenied) {
        Swal.fire("Operacion cancelada", "", "info");
      }
    });

  }
  addMenuTurno() : void{
    if (this.formAddMenu.value.idMenu!=null && this.formAddMenu.value.idTurno!=null){
      const request = {
        nomnbreMenu:null,
        idMenu: this.formAddMenu.get('idMenu')?.value,
        idPlato: null,
        idTurno:this.formAddMenu.get('idTurno')?.value
      }
      console.log(request)
      
      this.menuService.addTurnos(request).subscribe(
        response => {
          console.log('Turno introducido :', response);
          //alert('Turno agregado al menu ...');
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
            text: "Turno agregado al menu ...",
          
          });
          //this.formAddMenu.reset()
          this.loadMenus()
          this.selectedMenuF()
        },
        error => {
          console.error('Error al crear el turno:', error);
          //alert('El turno puede ya encontrarse dentro del menu...')
          const alert_ = Swal.mixin({
            customClass : {
                confirmButton : 'btn btn-danger'
            },
            buttonsStyling: false
          }
      
          )
          alert_.fire({
            icon: "error",
            title: "Error en la transaccion",
            text: "El turno puede ya encontrarse dentro del menu...",
          
          });
        },
      )
  }else{
    //alert("Campos vacios o erroneos")
    const alert_ = Swal.mixin({
      customClass : {
          confirmButton : 'btn btn-danger'
      },
      buttonsStyling: false
    }

    )
    alert_.fire({
      icon: "error",
      title: "Incompleto",
      text: "Campos vacios o erroneos",
    
    });
  }    
  }

  deleteMenuTurno() : void{
    if (this.formAddMenu.value.idMenu!=null && this.formAddMenu.value.idTurno!=null){
      const request = {
        nomnbreMenu:null,
        idMenu: this.formAddMenu.get('idMenu')?.value,
        idPlato: null,
        idTurno:this.formAddMenu.get('idTurno')?.value
      }
      console.log(request)
      
      this.menuService.DeleteTurnos(request).subscribe(
        response => {
          console.log('Turno eliminado :', response);
          //alert('Turno eliminado del menu ...');
          Swal.mixin({
            customClass : {
                confirmButton : 'btn btn-primary'
            },
            buttonsStyling: false
          }
      
          ).fire("'Turno eliminado del menu ...'");

          this.formAddMenu.controls['idTurno'].setValue(null)
          this.loadMenus()
          this.selectedMenuF()
        },
        error => {
          console.error('Error al eliminar el:', error);
          //alert('El turno puede no encontrarse dentro del menu...')
          const alert_ = Swal.mixin({
            customClass : {
                confirmButton : 'btn btn-danger'
            },
            buttonsStyling: false
          }
      
          )
          alert_.fire({
            icon: "error",
            title: "Error en la transaccion",
            text: "El turno puede no encontrarse asociado al menu",
          
          });
          
        },
      )
  }else{
    //alert("Campos vacios o erroneos")
    const alert_ = Swal.mixin({
      customClass : {
          confirmButton : 'btn btn-danger'
      },
      buttonsStyling: false
    }

    )
    alert_.fire({
      icon: "error",
      title: "Incompleto",
      text: "Campos vacios o erroneos",
    
    });
  }    
  }

  addTurno():void{
    if (this.formAddTurno.valid){
        const request = {
          nombreturno : this.formAddTurno.get('nombreturno')?.value,
          horaInicio : this.formAddTurno.get('horaInicio')?.value+":00",
          horaFin : this.formAddTurno.get('horaFin')?.value+":00"
        }
        console.log(request)
        
        this.turnoService.create(request).subscribe(
          response => {
            console.log('Turno creado:', response);
            //alert('Turno creado de manera exitosa...');
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
            this.formAddTurno.reset()
            this.loadPlatos()
            this.loadMenus()
            this.loadTurnos()
          },
          error => {
            console.error('Error al crear el turno:', error);
          },
        )
    }else{
      //alert("Campos vacios o erroneos")
      const alert_ = Swal.mixin({
        customClass : {
            confirmButton : 'btn btn-danger'
        },
        buttonsStyling: false
      }
  
      )
      alert_.fire({
        icon: "error",
        title: "Incompleto",
        text: "Campos vacios o erroneos",
      
      });
    }
  }
  addPlato():void{
    if (this.formAddPlato.valid){
        const request = {
          idPlato : null,
          nomnreplato : this.formAddPlato.get('nombrePlato')?.value,
          kcalPlato : this.formAddPlato.get('kcalPlato')?.value,
          pesoPlato : this.formAddPlato.get('pesoPlato')?.value
        }
        this.platoService.create(request).subscribe(
          response => {
            console.log('Menu creado:', response);
            //alert('Plato creado de manera exitosa...');
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
              text: "Plato creado de manera exitosa...",
            
            });
            this.formAddPlato.reset()
            this.loadPlatos()
            
          },
          error => {
            console.error('Error al crear el menu:', error);
          },
        )
    }else{
      //alert("Campos vacios o erroneos")
      const alert_ = Swal.mixin({
        customClass : {
            confirmButton : 'btn btn-danger'
        },
        buttonsStyling: false
      }
  
      )
      alert_.fire({
        icon: "error",
        title: "Incompleto",
        text: "Campos vacios o erroneos",
      
      });
    }
  }
  editPlato():void{
    if (this.formAddPlato.valid){
        const request = {
          idPlato : this.selectedPlatoEdit?.idPlato,
          nomnreplato : this.formAddPlato.get('nombrePlato')?.value,
          kcalPlato : parseFloat(this.formAddPlato.get('kcalPlato')?.value),
          pesoPlato : parseFloat(this.formAddPlato.get('pesoPlato')?.value)
        }
        this.platoService.update(request).subscribe(
          response => {
            console.log('Plato editado...:', response);
            //alert('Plato editado de manera exitosa...');
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
              text: "Plato editado de manera exitosa...",
            
            });
            this.formAddPlato.reset()
            this.loadPlatos()
          },
          error => {
            console.error('Error al editar el plato :', error);
          },
        )
    }else{
      //alert("Campos vacios o erroneos")
      const alert_ = Swal.mixin({
        customClass : {
            confirmButton : 'btn btn-danger'
        },
        buttonsStyling: false
      }
  
      )
      alert_.fire({
        icon: "error",
        title: "Incompleto",
        text: "Campos vacios o erroneos",
      
      });
    }
  }
  loadPlatos(): void{
      this.platoService.list().subscribe(
        data =>{
          if (data){
            this.platosList = data;
          }
        }
      )
  }

  loadTurnos() : void {
    this.turnoService.list().subscribe(
      data=>{
        if (data){
          this.turnosList = data;
        }
      }
    )
  }
  selectPlato() : void{
    this.loadPlatos()
    const currid = this.formAddPlato.value.idPlato
    console.log(currid)
    this.selectedPlatoEdit = this.platosList.filter(plato => plato.idPlato == currid)[0]
    console.log(this.selectedPlatoEdit)
    this.formAddPlato.controls['nombrePlato'].setValue(this.selectedPlatoEdit.nombrePlato)
    this.formAddPlato.controls['kcalPlato'].setValue(this.selectedPlatoEdit.kcalPlato)
    this.formAddPlato.controls['pesoPlato'].setValue(this.selectedPlatoEdit.pesoPlato)
  }
  selectedMenuF():void{
    //this.loadMenus()
    this.menuService.getAll().subscribe(
      data=>{
        if (data){
          this.menuList = data;
          const currid = this.formAddMenu.get('idMenu')?.value
          console.log(currid)
          this.selectedMenu = this.menuList.filter(menu => menu.idMenu == currid)[0]
        }
      }
    )
    
  }
  loadMenus() :void {
    this.menuService.getAll().subscribe(
      data=>{
        if (data){
          this.menuList = data;
        }
      }
    )
  }
}
