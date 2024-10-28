import { Component, OnInit } from '@angular/core';
import { VeiculosService } from '../veiculos.service';
import { Veiculo } from '../model/Veiculos';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {
  veiculos: Veiculo[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private veiculosService: VeiculosService) {}

  ngOnInit(): void {
    this.loadVeiculos();
  }

  loadVeiculos(): void {
    this.loading = true;
    this.errorMessage = null;

    this.veiculosService.getVeiculos()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.veiculos = data,
        error: (err) => this.errorMessage = 'Erro ao carregar veículos. Tente novamente mais tarde.'
      });
  }

  deleteVeiculo(id: number): void {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.veiculosService.deleteVeiculo(id).subscribe({
        next: () => {
          this.veiculos = this.veiculos.filter(v => v.id !== id);
        },
        error: () => this.errorMessage = 'Erro ao excluir veículo.'
      });
    }
  }
}
