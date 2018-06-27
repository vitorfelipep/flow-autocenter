import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const appRouter: Routes = [
  { path: '', redirectTo: 'alertas', pathMatch: 'full' },
  { path: 'alertas', loadChildren: 'app/alert/alert.module#AlertModule' }
  // ,
  // { path: 'aplicacoes', loadChildren: 'app/application/application.module#ApplicationModule' },
  // { path: 'permissoes', loadChildren: 'app/person-role/person-role.module#PersonRoleModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
