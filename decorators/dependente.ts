import { DeductionDecorator } from "./deduction-decorator.js";
import { CalculationInput, CalculationOutput } from "../domain/types.js";
import { TaxTableProvider } from "../infra/tax-table-provider.js";

export class DependenteDeduction extends DeductionDecorator {
  applyDeduction(out: CalculationOutput, input: CalculationInput): CalculationOutput {
    const qtd = input.deducoes?.dependentes ?? input.contribuinte.dependentes ?? 0;
    const depUnit = TaxTableProvider.getInstance().getForYear(input.ano).limites.depAnual;
    const deduc = depUnit * qtd;

    return {
      ...out,
      impostoDevido: Math.max(0, Number((out.impostoDevido - deduc).toFixed(2))),
      deducoesAplicadas: {
        ...out.deducoesAplicadas,
        dependentes: Number(deduc.toFixed(2))
      }
    };
  }
}
