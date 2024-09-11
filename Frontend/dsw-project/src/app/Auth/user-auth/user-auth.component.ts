import { Component } from '@angular/core';
import { RouterOutlet,RouterModule,Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule,FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';
import { UserComponent } from '../../entities/user/user.component';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
    formGroup : FormGroup = new FormGroup({});
    constructor(private userService:UserServiceService,private route:Router){}
   // public currentUser?:UserComponent;
    ngOnInit(){

      this.userService.logout();
      this.formGroup = new FormGroup({
        username:new FormControl('',[Validators.required]),
        password:new FormControl('',[Validators.required]),
      }
      )
    }

    login(){
      if(this.formGroup.valid){
        this.userService.login(this.formGroup.value ).subscribe(
          {
            next:(userData) => {
              console.log(userData);
            }, 
            error:(errorData) =>{
              console.log(errorData);
              alert('Usuario no encontrado...');
            },
            complete:() =>{
              console.log("admin user jwt : ")
              console.log(this.userService.userToken)
              console.log(this.userService.currentUserJwt)
              console.log("admin user data : ")
              console.log(this.userService.myuserData)
              console.log(this.userService.currentUserRole)
              console.log(this.userService.userRole)
              if (document.URL.toString() == 'http://localhost:4200/IniciarSesion/Administrador' && this.userService.userRole=="admint"){
                  this.route.navigateByUrl('/AdminWebPage/AdminWeb');
                  this.formGroup.reset();
              }
              else if(document.URL.toString() == 'http://localhost:4200/IniciarSesion/Alumno' && this.userService.userRole=="2"){
                  this.route.navigateByUrl('/AlumnoWebPage/AlumnoWeb/inicio');
                  this.formGroup.reset();
              }else{
                alert('Usuario no valido');
                this.userService.logout();
              }
              console.info('Operacion terminada');
              
            }
            
          }
        )
      }else{
        alert('Campos en blanco o erroneos');
        console.log('Campos invalidos...')
        this.formGroup.reset();
        return;
      }
    }
    Back(){
      this.userService.logout();
      this.formGroup.reset();
      window.location.href = '#!';
    }
}
