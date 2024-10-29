import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Veiculo } from './model/Veiculos';
import { CommonModule } from '@angular/common';
import { VeiculosService } from './veiculos.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
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
        this.veiculosLista = data.map(veiculo => ({ ...veiculo, selected: false }));
      },
      error: (err) => {
        console.error('Erro ao carregar dados da API', err);
      }
    });
  }

  onSave() {
    if (this.veiculosForm.valid) {
      const newVeiculo: Veiculo = this.veiculosForm.value;

      this.veiculosService.createVeiculo(newVeiculo).subscribe({
        next: (response) => {
          this.veiculosLista.unshift(response);
          alert('Veículo salvo com sucesso.');
        },
        error: (error) => {
          console.error('Erro ao salvar o veículo:', error);
          alert('Erro ao salvar o veículo. Tente novamente.');
        }
      });

      this.veiculosForm.reset();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  }

  deleteVeiculo(id: number) {
    if (confirm("Deseja realmente excluir este veículo?")) {
      this.veiculosService.deleteVeiculo(id).subscribe({
        next: () => {
          this.veiculosLista = this.veiculosLista.filter(veiculo => veiculo.id !== id);
          alert('Veículo excluído com sucesso.');
        },
        error: (error) => console.error('Erro ao excluir o veículo:', error)
      });
    }
  }

  deleteSelected() {
    const selectedIds = this.veiculosLista
      .filter(veiculo => veiculo.selected)
      .map(veiculo => veiculo.id);

    if (selectedIds.length > 0 && confirm("Deseja realmente excluir os veículos selecionados?")) {
      selectedIds.forEach(id => {
        this.veiculosService.deleteVeiculo(id).subscribe({
          next: () => {
            this.veiculosLista = this.veiculosLista.filter(veiculo => veiculo.id !== id);
          },
          error: (error) => console.error('Erro ao excluir o veículo:', error)
        });
      });
      alert('Veículos selecionados excluídos com sucesso.');
    } else {
      alert('Nenhum veículo selecionado para exclusão.');
    }
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.veiculosLista.forEach(veiculo => veiculo.selected = checked);
  }
}
