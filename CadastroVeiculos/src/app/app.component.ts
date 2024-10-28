import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Veiculo } from './model/Veiculos';
import { CommonModule } from '@angular/common';
import { VeiculosService } from './veiculos.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [VeiculosService]
})
export class AppComponent implements OnInit {
  title = 'CadastroVeiculos';
  veiculosForm!: FormGroup; 
  veiculosLista: Veiculo[] = []; 
  veiculosObj: Veiculo = new Veiculo();

  marcas = [
    { id: 1, nome: 'Toyota' },
    { id: 2, nome: 'Ford' },
    { id: 3, nome: 'Honda' }
  ];

  constructor(private veiculosService: VeiculosService) {
    this.createForm();
  }

  ngOnInit() {
    this.loadVeiculosData();
  }

  createForm() {
    this.veiculosForm = new FormGroup({
      id: new FormControl(this.veiculosObj.id),
      marca: new FormControl(this.veiculosObj.marca),
      ano: new FormControl(this.veiculosObj.ano),
      created_at: new FormControl(this.veiculosObj.created_at),
      updated_at: new FormControl(this.veiculosObj.updated_at),
      financiado: new FormControl(this.veiculosObj.financiado),
      modelo: new FormControl(this.veiculosObj.modelo),
      placa: new FormControl(this.veiculosObj.placa)
    });
  }

loadVeiculosData() {
  this.veiculosService.getVeiculos().subscribe({
    next: (data) => {
      // console.log('Dados recebidos:', data); // Ativar para receber o Log de dados da API 
      this.veiculosLista = data;
    },
    error: (err) => {
      console.error('Erro ao carregar dados da API', err);
    }
  });
}


  onSave() {
    let newId = this.veiculosLista.length > 0 ? this.veiculosLista.length + 1 : 1;
    this.veiculosForm.controls['id'].setValue(newId);
    this.veiculosLista.unshift(this.veiculosForm.value);

    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("EmpData", JSON.stringify(this.veiculosLista));
    }
  }
}
