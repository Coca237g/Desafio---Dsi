import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VeiculoModel } from './model/Veiculos';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CadastroVeiculos';
  VeiculosForm: FormGroup = new FormGroup({});
  VeiculosLista: VeiculoModel[] = [];
  VeiculosObj: VeiculoModel = new VeiculoModel();

  constructor() {
    this.createForm();
    this.loadVeiculosData();
  }

  createForm() {
    this.VeiculosForm = new FormGroup({
      id: new FormControl(this.VeiculosObj.id),
      marca: new FormControl(this.VeiculosObj.marca),
      ano: new FormControl(this.VeiculosObj.ano),
      created_at: new FormControl(this.VeiculosObj.created_at),
      updated_at: new FormControl(this.VeiculosObj.updated_at),
      financiado: new FormControl(this.VeiculosObj.financiado),
      modelo: new FormControl(this.VeiculosObj.modelo),
      placa: new FormControl(this.VeiculosObj.placa)
    });
  }

  loadVeiculosData() {
    if (typeof window !== 'undefined' && localStorage) {
      const oldData = localStorage.getItem("EmpData");
      if (oldData != null) {
        try {
          const parseData = JSON.parse(oldData);
          this.VeiculosLista = parseData || [];
        } catch (e) {
          console.error("Failed to parse localStorage data", e);
        }
      }
    }
  }

  onSave() {
    if (typeof window !== 'undefined' && localStorage) {
      let newId = 1;
      const oldData = localStorage.getItem("EmpData");
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        newId = parseData.length + 1;
      }

      this.VeiculosForm.controls['id'].setValue(newId);
      this.VeiculosLista.unshift(this.VeiculosForm.value);

      localStorage.setItem("EmpData", JSON.stringify(this.VeiculosLista));
    }
  }
}
