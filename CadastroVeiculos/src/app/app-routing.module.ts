import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaOrdensComponent } from "./ordens/lista-ordens/lista-ordens.component"; // Import the component

export const routes: Routes = [
  { path: 'ordens', component: ListaOrdensComponent },  // 'ordens' path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}