import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnuevoPage } from './addnuevo.page';

const routes: Routes = [
  {
    path: '',
    component: AddnuevoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnuevoPageRoutingModule {}
