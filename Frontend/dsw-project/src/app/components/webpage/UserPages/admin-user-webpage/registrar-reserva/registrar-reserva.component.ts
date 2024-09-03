import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserServiceService } from '../../../../../services/user-service.service';

@Component({
  selector: 'app-registrar-reserva',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './registrar-reserva.component.html',
  styleUrl: './registrar-reserva.component.css'
})
export class RegistrarReservaComponent {
  userLoginOn:boolean=false;
  constructor(private userService:UserServiceService,private route:Router) { }
 
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
}
