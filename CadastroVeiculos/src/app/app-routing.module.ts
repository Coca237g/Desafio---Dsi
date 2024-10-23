import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'veiculos', loadChildren: () => import('./veiculos/veiculos.module').then(m => m.VeiculosModule) } // Virar sempre 'veiculos' ( Adicionar outra aba )
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
