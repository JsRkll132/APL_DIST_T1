import { Component } from '@angular/core';
import { RouterOutlet ,RouterModule, Route, Router} from '@angular/router';
import { UserServiceService } from '../../../services/user-service.service';
@Component({
  selector: 'app-dswproinit',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './dswproinit.component.html',
  styleUrl: './dswproinit.component.css'
})
export class DswproinitComponent {
      constructor(private userService:UserServiceService,private route:Router){

      }
      ngOnInit(){
      //  window.localStorage.clear()
      //  this.userService.logout();
        
        console.log(this.userService.currentUserLoginOn.value);
        console.log(this.userService.currentUserJwt.value);
        console.log(this.userService.currentUserRole.value);
        console.log(this.userService.myuserData);
        console.log('usertoken');
        console.log(this.userService.userToken);
        if(this.userService.currentUserLoginOn.value==true && this.userService.currentUserRole.value=="admint"){
            this.route.navigateByUrl("/AdminWebPage/AdminWeb");
        }
        else if(this.userService.currentUserLoginOn.value==true && this.userService.currentUserRole.value=="2"){
          this.route.navigateByUrl("/AlumnoWebPage/AlumnoWeb");
        }else{
          window.localStorage.clear()
        }
       
      }
      reload_(){
   
        window.localStorage.clear()
      }
}
