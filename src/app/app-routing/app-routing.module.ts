import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {LobbyComponent} from '../components/lobby/lobby.component';
import {LoginComponent} from '../components/login/login.component';
import {AuthGuardService} from '../services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'lobby', component: LobbyComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
