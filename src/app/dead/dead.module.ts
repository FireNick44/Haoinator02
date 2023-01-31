import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeadPageRoutingModule } from './dead-routing.module';

import { DeadPage } from './dead.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeadPageRoutingModule
  ],
  declarations: [DeadPage]
})
export class DeadPageModule {}
