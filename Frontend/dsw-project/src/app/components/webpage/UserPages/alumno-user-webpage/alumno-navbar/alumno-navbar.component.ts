import { Component } from '@angular/core';
import { Router, RouterModule,RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../../../../../services/user-service.service';
import { AlumnosService } from '../../../../../services/dbQuerys/alumnos.service';
import { MenuService } from '../../../../../services/dbQuerys/menu.service';
import { AlumnoUserPanelComponent } from '../alumno-user-panel/alumno-user-panel.component';
import { AlumnoUserWebpageComponent } from '../alumno-realizar-op/alumno-user-webpage.component';
@Component({
  selector: 'app-alumno-navbar',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, AlumnoNavbarComponent],
  templateUrl: './alumno-navbar.component.html',
  styleUrl: './alumno-navbar.component.css'
})
export class AlumnoNavbarComponent {
  userLoginOn:boolean=false;
  constructor(private userService:UserServiceService,private route:Router,private alumnoService:AlumnosService,private menuService:MenuService) { }
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
    
  }

      
  logout():void{
    this.userService.logout();

    
    window.localStorage.clear()
    window.location.href = '#!';
   // window.location.reload()
    
  }
}
