import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Veiculo } from './model/Veiculos';
import { VeiculosService } from './veiculos.service';
import { HttpClientModule } from '@angular/common/http'; // Adicione HttpClientModule aqui para standalone
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule], // Certifique-se de incluir HttpClientModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [VeiculosService]
})
export class AppComponent implements OnInit {
  title = 'CadastroVeiculos';
  veiculosForm!: FormGroup;
  veiculosLista: Veiculo[] = [];
  marcas = [
    { id: 1, nome: 'Toyota' },
    { id: 2, nome: 'Ford' },
    { id: 3, nome: 'Honda' }
  ];

  constructor(private veiculosService: VeiculosService) {}

  ngOnInit() {
    this.createForm();
    this.loadVeiculosData();
  }

  createForm() {
    this.veiculosForm = new FormGroup({
      id: new FormControl(''),
      marca: new FormControl(''),
      ano: new FormControl(''),
      created_at: new FormControl(''),
      updated_at: new FormControl(''),
      financiado: new FormControl(false),
      modelo: new FormControl(''),
      placa: new FormControl('')
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
      const veiculoData: Veiculo = this.veiculosForm.value;

      if (veiculoData.id) {
        this.veiculosService.updateVeiculo(veiculoData).subscribe({
          next: (response) => {
            const index = this.veiculosLista.findIndex(v => v.id === response.id);
            if (index !== -1) {
              this.veiculosLista[index] = response;
            }
            alert('Veículo atualizado com sucesso.');
          },
          error: (error) => {
            console.error('Erro ao atualizar o veículo:', error);
            alert('Erro ao atualizar o veículo. Tente novamente.');
          }
        });
      } else {
        this.veiculosService.createVeiculo(veiculoData).subscribe({
          next: (response) => {
            this.veiculosLista.unshift(response);
            alert('Veículo salvo com sucesso.');
          },
          error: (error) => {
            console.error('Erro ao salvar o veículo:', error);
            alert('Erro ao salvar o veículo. Tente novamente.');
          }
        });
      }
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

  editSelected() {
    const selectedVeiculos = this.veiculosLista.filter(veiculo => veiculo.selected);

    if (selectedVeiculos.length !== 1) {
      alert('Selecione apenas um veículo para editar.');
      return;
    }

    const veiculoToEdit = selectedVeiculos[0];
    this.veiculosForm.patchValue({
      id: veiculoToEdit.id,
      marca: veiculoToEdit.marca,
      ano: veiculoToEdit.ano,
      created_at: veiculoToEdit.created_at,
      updated_at: veiculoToEdit.updated_at,
      financiado: veiculoToEdit.financiado,
      modelo: veiculoToEdit.modelo,
      placa: veiculoToEdit.placa
    });
  }
}
