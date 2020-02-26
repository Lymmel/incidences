import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnuevoPageRoutingModule } from './addnuevo-routing.module';

import { AddnuevoPage } from './addnuevo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddnuevoPageRoutingModule
  ],
  declarations: [AddnuevoPage]
})
export class AddnuevoPageModule {}
