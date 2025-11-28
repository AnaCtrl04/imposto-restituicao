import { TaxStrategy, makeOutputBase } from "./tax-strategy.js";
import { CalculationInput } from "../domain/types.js";

export class PresumidoStrategy implements TaxStrategy {
  name = "presumido";
  calculate(input: CalculationInput) {
    // Ex.: presume 32% da receita como base; alíquota sobre a base presumida
    const base = input.renda.anualBruto * 0.32;
    const imposto = base * 0.15;
    return makeOutputBase(input, this.name, imposto);
  }
}

