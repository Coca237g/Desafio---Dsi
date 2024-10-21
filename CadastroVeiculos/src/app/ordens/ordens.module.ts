import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaOrdensComponent } from "../ordens/lista-ordens/lista-ordens.component"; // Import the component

@NgModule({
  imports: [
    CommonModule,
    ListaOrdensComponent
  ],
  exports: [ListaOrdensComponent]
})
export class OrdensModule { }
