import { DeductionDecorator } from "./deduction-decorator.js";
import { CalculationInput, CalculationOutput } from "../domain/types.js";
import { TaxTableProvider } from "../infra/tax-table-provider.js";

export class SaudeDeduction extends DeductionDecorator {
  applyDeduction(out: CalculationOutput, input: CalculationInput): CalculationOutput {
    const bruto = input.deducoes?.gastosSaude ?? 0;
    const teto = TaxTableProvider.getInstance().getForYear(input.ano).limites.saudeMax;
    const deduc = Math.min(bruto, teto);

    return {
      ...out,
      impostoDevido: Math.max(0, Number((out.impostoDevido - deduc).toFixed(2))),
      deducoesAplicadas: {
        ...out.deducoesAplicadas,
        saude: Number(deduc.toFixed(2))
      }
    };
  }
}
