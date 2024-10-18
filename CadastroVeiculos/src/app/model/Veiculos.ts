export class VeiculoModel { 
    id: Number;
    marca: String;
    modelo: String;
    ano: String;
    placa: String;
    financiado: String;
    created_at: String;
    updated_at: String;

    constructor() {
        this.id = 0;
        this.financiado = '';
        this.updated_at = '';
        this.created_at = '';
        this.placa = '';
        this.modelo = '';
        this.marca = '';
        this.ano = '';
        
    }
}