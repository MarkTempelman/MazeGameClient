import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {LobbyComponent} from '../components/lobby/lobby.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'lobby', component: LobbyComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
