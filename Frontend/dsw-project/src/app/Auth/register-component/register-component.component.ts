import { Component } from '@angular/core';
import { RouterOutlet,RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from '../../services/user-service.service';
@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent {
    formGroup : FormGroup = new FormGroup({});
    form_aux_pass : FormControl = new FormControl('');
    constructor(private userService:UserServiceService,private route:Router){}
    ngOnInit(){

      this.formGroup = new FormGroup({
        alumnoNombre:new FormControl('',[Validators.required]),
        alumnoNombre2:new FormControl('',[Validators.required]),
        alumnoApellido1:new FormControl('',[Validators.required]),
        alumnoApellido2:new FormControl('',[Validators.required]),
        alumnoCorreoPersonal:new FormControl('',[Validators.required]),
        username:new FormControl('',[Validators.required]),
        password:new FormControl('',[Validators.required]),
      }
      )
    }
    register(){
      console.log(this.formGroup.get('password')?.value)
      console.log(this.form_aux_pass.value)
      if (this.form_aux_pass.value!==this.formGroup.get('password')?.value){
        alert("Las contraseñas no coinciden");
        return;
      }
      if (this.formGroup.valid){
        this.userService.Register(this.formGroup.value).subscribe(
          {
            next:(userData) => {
              console.log(userData);
            }, 
            error:(errorData) =>{
              console.log(errorData);
              alert('Hubo un error al momento del registro');
            },
            complete:() =>{
              alert("Registro exitoso para"+this.formGroup.get('username')?.value);
              console.info('Operacion terminada');
              this.formGroup.reset();
              this.form_aux_pass.reset();
            }
            
          }
        )
      }else{
        alert('Uno o mas campos erroneos .. ');
      }

    }
    goBefore(){
      window.location.href = '#!';
    }
}
