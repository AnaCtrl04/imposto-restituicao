export type TaxYear = number;

export type TaxPayer = {
  nome: string;
  dependentes: number;
};

export type Income = {
  anualBruto: number;
  custosDedutiveis?: number;
};

export type DeductionInput = {
  dependentes?: number;
  gastosSaude?: number;
  gastosEducacao?: number;
};

export type CalculationInput = {
  ano: TaxYear;
  contribuinte: TaxPayer;
  renda: Income;
  deducoes?: DeductionInput;
};

export type CalculationOutput = {
  ano: TaxYear;
  impostoDevido: number;
  deducoesAplicadas: {
    dependentes: number;
    saude: number;
    educacao: number;
  };
  regime: string;
};
