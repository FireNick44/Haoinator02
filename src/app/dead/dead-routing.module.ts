import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeadPage } from './dead.page';

const routes: Routes = [
  {
    path: '',
    component: DeadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeadPageRoutingModule {}
