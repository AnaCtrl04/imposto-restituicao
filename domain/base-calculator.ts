import { CalculationInput, CalculationOutput } from "./types";
import { TaxStrategy } from "../strategies/tax-strategy";

export class BaseTaxCalculator {
  constructor(private strategy: TaxStrategy) {}

  setStrategy(strategy: TaxStrategy) {
    this.strategy = strategy;
  }

  calculate(input: CalculationInput): CalculationOutput {
    return this.strategy.calculate(input);
  }
}
