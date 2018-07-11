import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoListComponent } from './atendimento-list/atendimento-list.component';
import { AtendimentoFormComponent } from './atendimento-form/atendimento-form.component';

const atendimentoRoutes: Routes = [
  { path: '', component: AtendimentoListComponent },
  { path: 'atendimentos', component: AtendimentoListComponent },
  { path: 'form', component: AtendimentoFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(atendimentoRoutes)],
    exports: [RouterModule]
})
export class AtedimentoRoutingModule { }
