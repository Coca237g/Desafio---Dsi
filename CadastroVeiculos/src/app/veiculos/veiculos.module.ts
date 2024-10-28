import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { VeiculosComponent } from './veiculos.component';

const routes: Routes = [
  { path: '', component: VeiculosComponent }
];

@NgModule({
  declarations: [VeiculosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class VeiculosModule {}
