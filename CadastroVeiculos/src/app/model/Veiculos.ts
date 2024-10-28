export class Veiculo {
    id: number;
    marca: string;
    modelo: string;
    ano: string;
    placa: string;
    financiado: boolean;
    created_at?: string;
    updated_at?: string;
  
    constructor() {
      this.id = 0;
      this.marca = '';
      this.modelo = '';
      this.placa = '';
      this.ano = '';
      this.financiado = false;
      this.created_at = '';
      this.updated_at = '';
    }
  }
  