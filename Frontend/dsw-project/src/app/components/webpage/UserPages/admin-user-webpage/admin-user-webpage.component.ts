import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../services/user-service.service';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminworksService } from '../../../../services/adminservices/adminworks.service';
import { HTTP_INTERCEPTORS, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-admin-user-webpage',
  standalone: true,
  imports: [RouterModule,RouterModule,CommonModule],
  templateUrl: './admin-user-webpage.component.html',
  styleUrl: './admin-user-webpage.component.css'
})
export class AdminUserWebpageComponent implements OnInit{
  userLoginOn:String="";
  ListUsers:any[] = [];
  constructor(private userService:UserServiceService,private route:Router,private adminServices:AdminworksService,
    ) { }
 
  ngOnInit(): void {
    this.userService.currentUserRole.subscribe({
      next:(userLoginOn) => {
        console.log(userLoginOn)
        this.userLoginOn=userLoginOn;
        if(this.userLoginOn!="admint" ){
          this.route.navigateByUrl("/IniciarSesion/Administrador");
          this.logout();
        }
      }
    }
    )
    this.getAllUsers();

  }

  logout():void{
    this.userService.logout();
    
    this.route.navigateByUrl("")
    window.localStorage.clear()
   // window.location.reload()
    
  }

  getAllUsers():void{
    this.adminServices.getAllUsers().subscribe(
      data =>{
        if (data){
          this.ListUsers=data;
        }
      }
    )
  }

}
