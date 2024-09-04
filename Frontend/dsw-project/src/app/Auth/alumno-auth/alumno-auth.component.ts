import { Component } from '@angular/core';
import { UserAuthComponent } from "../user-auth/user-auth.component";
import { RouterOutlet,RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';
@Component({
    selector: 'app-alumno-auth',
    standalone: true,
    templateUrl: './alumno-auth.component.html',
    styleUrl: './alumno-auth.component.css',
    imports: [HttpClientModule,UserAuthComponent ,RouterOutlet,RouterModule,CommonModule]
})
export class AlumnoAuthComponent {
    constructor(private userService:UserServiceService,private route:Router){}
    ngOnInit(){

        this.userService.logout();
      }
}
