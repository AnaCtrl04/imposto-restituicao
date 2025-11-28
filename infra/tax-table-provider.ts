

type FaixaProgressiva = [number, number, number]; // [limite, aliquota, parcelaDeduzir]

type TaxYearConfig = {
  progressiva: {
    faixa: FaixaProgressiva[];
  };
  limites: {
    depAnual: number;
    saudeMax: number;
    educacaoMax: number;
  };
};

export class TaxTableProvider {
  private static instance: TaxTableProvider;

  // cache de configuração por ano-calendário
  private cache = new Map<number, TaxYearConfig>();

  private constructor() {}

  static getInstance(): TaxTableProvider {
    if (!TaxTableProvider.instance) {
      TaxTableProvider.instance = new TaxTableProvider();
    }
    return TaxTableProvider.instance;
  }

  getForYear(ano: number): TaxYearConfig {
    if (!this.cache.has(ano)) {
      // valores-exemplo (ajuste conforme a regra da disciplina)
      const faixas: FaixaProgressiva[] = [
        [22847.76, 0.0,   0.0],
        [33919.80, 0.075, 1713.58],
        [45012.60, 0.15,  4257.57],
        [55976.16, 0.225, 7633.51],
        [Infinity, 0.275, 10432.32],
      ];

      const tabela: TaxYearConfig = {
        progressiva: {
          faixa: faixas,
        },
        limites: {
          depAnual: 2280.0,    // dedução anual por dependente (exemplo)
          saudeMax: 5000.0,    // teto saúde (exemplo)
          educacaoMax: 3561.5, // teto educação (exemplo)
        },
      };

      this.cache.set(ano, tabela);
    }

    return this.cache.get(ano)!;
  }
}
