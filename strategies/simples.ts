import { TaxStrategy, makeOutputBase } from "./tax-strategy.js";
import { CalculationInput } from "../domain/types.js";

export class SimplesStrategy implements TaxStrategy {
  name = "simples";
  calculate(input: CalculationInput) {
    // Ex.: 6% fixo sobre renda anual (exemplo acadêmico)
    const imposto = input.renda.anualBruto * 0.06;
    return makeOutputBase(input, this.name, imposto);
  }
}
