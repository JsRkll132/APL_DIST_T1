import { Component } from '@angular/core';
import { UserAuthComponent } from "../user-auth/user-auth.component";
import { RouterOutlet,RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';
@Component({
    selector: 'app-administrador-auth',
    standalone: true,
    templateUrl: './administrador-auth.component.html',
    styleUrl: './administrador-auth.component.css',
    imports: [HttpClientModule,UserAuthComponent,RouterOutlet,RouterModule,CommonModule]
})
export class AdministradorAuthComponent {
    constructor(private userService:UserServiceService,private route:Router){}
    ngOnInit(){

        this.userService.logout();
      }
}
