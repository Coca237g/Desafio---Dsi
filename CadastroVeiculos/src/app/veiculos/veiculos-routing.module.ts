import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaOrdensComponent } from "../ordens/lista-ordens/lista-ordens.component";

const routes: Routes = [
  { path: 'ordens', component: ListaOrdensComponent },
  { path: 'veiculos', loadChildren: () => import('../veiculos/veiculos.module').then(m => m.VeiculosModule) } // Ensure lowercase 'veiculos'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
