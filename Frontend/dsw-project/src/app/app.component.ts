import { Component } from '@angular/core';
import { RouterOutlet ,RouterModule} from '@angular/router';
import { DswproheadComponent } from "./components/webpage/dswprohead/dswprohead.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { UserComponent } from './entities/user/user.component';
import { AdministradorAuthComponent } from './Auth/administrador-auth/administrador-auth.component';
import { AlumnoAuthComponent } from './Auth/alumno-auth/alumno-auth.component';
import { GenaiServiceService } from './services/GenAi/genai-service.service';
import { CommonModule } from '@angular/common';
import { LivechatwidgetComponentComponent } from './components/webpage/livechatwidget-component/livechatwidget-component.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [  AlumnoAuthComponent, AdministradorAuthComponent ,UserComponent,FormsModule,HttpClientModule,ReactiveFormsModule,
      RouterOutlet, DswproheadComponent,RouterModule,CommonModule,LivechatwidgetComponentComponent
    ],
    providers : [GenaiServiceService]
})
export class AppComponent {
  title = 'dsw-project';
}
