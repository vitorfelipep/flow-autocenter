import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const appRouter: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'atendimentos', loadChildren: 'app/jcCar/atendimento.module#AtedimentoModule' }
  // ,
  // { path: 'aplicacoes', loadChildren: 'app/application/application.module#ApplicationModule' },
  // { path: 'permissoes', loadChildren: 'app/person-role/person-role.module#PersonRoleModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
