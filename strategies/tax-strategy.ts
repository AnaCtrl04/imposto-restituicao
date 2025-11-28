import { CalculationInput, CalculationOutput } from "../domain/types.js";

export interface TaxStrategy {
  name: string;
  calculate(input: CalculationInput): CalculationOutput;
}

/** Utilitário comum: zera deduções; Decorators preencherão depois */
export function makeOutputBase(
  input: CalculationInput,
  regime: string,
  imposto: number
): CalculationOutput {
  return {
    ano: input.ano,
    regime,
    impostoDevido: Math.max(0, Number(imposto.toFixed(2))),
    deducoesAplicadas: { dependentes: 0, saude: 0, educacao: 0 },
  };
}
