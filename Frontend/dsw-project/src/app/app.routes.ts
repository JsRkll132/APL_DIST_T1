import { Routes } from '@angular/router';
import { DswproinitComponent } from './components/webpage/dswproinit/dswproinit.component';
import { AlumnoAuthComponent } from './Auth/alumno-auth/alumno-auth.component';
import { AdministradorAuthComponent } from './Auth/administrador-auth/administrador-auth.component';
import { AlumnoUserWebpageComponent } from './components/webpage/UserPages/alumno-user-webpage/alumno-user-webpage.component';
import { AdminUserWebpageComponent } from './components/webpage/UserPages/admin-user-webpage/admin-user-webpage.component';
import { RacionesComponent } from './components/webpage/UserPages/admin-user-webpage/AsignarRaciones/raciones.component';
import { ConsultaRacionesComponent } from './components/webpage/UserPages/admin-user-webpage/consulta-raciones/consulta-raciones.component';
import { EditarMenuComponent } from './components/webpage/UserPages/admin-user-webpage/editar-menu/editar-menu.component';
import { RegistrarReservaComponent } from './components/webpage/UserPages/admin-user-webpage/registrar-reserva/registrar-reserva.component';
import { VisualizarRacionesComponent } from './components/webpage/UserPages/admin-user-webpage/visualizar-raciones/visualizar-raciones.component';
import { EditarRacionesComponent } from './components/webpage/UserPages/admin-user-webpage/editar-raciones/editar-raciones.component';
import { RegisterComponentComponent } from './Auth/register-component/register-component.component';
export const routes: Routes = [
    {path:'',redirectTo:'/PanelInicial',pathMatch:'full'},
    {path:'PanelInicial',component:DswproinitComponent},
    {path:'IniciarSesion/Alumno',component:AlumnoAuthComponent},
    {path:'Registro/Alumno',component:RegisterComponentComponent},
    {path:'IniciarSesion/Administrador',component:AdministradorAuthComponent},
    {path:'AlumnoWebPage/AlumnoWeb',component:AlumnoUserWebpageComponent},
    {path:'AdminWebPage/AdminWeb',component:AdminUserWebpageComponent},
    {path:'AdminWebPage/AdminWeb/AsignarRaciones',component:RacionesComponent},
    {path:'AdminWebPage/AdminWeb/ConsultarReservas',component:ConsultaRacionesComponent},
    {path:'AdminWebPage/AdminWeb/EditarMenu',component:EditarMenuComponent},
    {path:'AdminWebPage/AdminWeb/EditarRaciones',component:EditarRacionesComponent},
    {path:'AdminWebPage/AdminWeb/RegistrarReserva',component:RegistrarReservaComponent},
    {path:'AdminWebPage/AdminWeb/VisualizarRaciones',component:VisualizarRacionesComponent},
    {path:'**',redirectTo:'PanelInicial',pathMatch:'full'}
];
