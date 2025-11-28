import { TaxStrategy, makeOutputBase } from "./tax-strategy.js";
import { CalculationInput } from "../domain/types.js";

export class RealStrategy implements TaxStrategy {
  name = "real";
  calculate(input: CalculationInput) {
    const base = Math.max(0, input.renda.anualBruto - (input.renda.custosDedutiveis ?? 0));
    const imposto = base * 0.12; // ex.: 12% sobre base real
    return makeOutputBase(input, this.name, imposto);
  }
}
