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

  VeiculosForm: FormGroup = new FormGroup({});
  VeiculosLista: VeiculoModel[] = [];
  VeiculosObj: VeiculoModel = new VeiculoModel();

  constructor() {
    this.createForm();
    this.loadVeiculosData();
  }

  createForm() { debugger
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

  loadVeiculosData() { debugger
    if (typeof window !== 'undefined' && localStorage) {  // Verifica se localStorage está disponível
      const oldData = localStorage.getItem("EmpData");
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.VeiculosLista = parseData;
      }
    }
  }

  onSave() { debugger
    if (typeof window !== 'undefined' && localStorage) {  // Verifica se localStorage está disponível
      const oldData = localStorage.getItem("EmpData");
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.VeiculosForm.controls['id'].setValue(parseData.length + 1);
        this.VeiculosLista.unshift(this.VeiculosForm.value);
      } else {
        this.VeiculosLista.unshift(this.VeiculosForm.value);
      }
      // Salvar os dados atualizados no localStorage
      localStorage.setItem("EmpData", JSON.stringify(this.VeiculosLista));
    }
  }
}
