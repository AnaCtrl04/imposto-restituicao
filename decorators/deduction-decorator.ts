import { BaseTaxCalculator } from "../domain/base-calculator";
import { CalculationInput, CalculationOutput } from "../domain/types.js";

/**
 * DECORATOR: envolve um calculator e acrescenta deduções.
 */
export abstract class DeductionDecorator extends BaseTaxCalculator {
  constructor(protected inner: BaseTaxCalculator) { super((inner as any)["strategy"]); }

  abstract applyDeduction(out: CalculationOutput, input: CalculationInput): CalculationOutput;

  calculate(input: CalculationInput): CalculationOutput {
    const base = this.inner.calculate(input);
    return this.applyDeduction(base, input);
  }
}
