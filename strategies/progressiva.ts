import { TaxStrategy, makeOutputBase } from "./tax-strategy.js";
import { CalculationInput } from "../domain/types.js";
import { TaxTableProvider } from "../infra/tax-table-provider.js";

export class ProgressivaStrategy implements TaxStrategy {
  name = "progressiva";
  calculate(input: CalculationInput) {
    const T = TaxTableProvider.getInstance().getForYear(input.ano).progressiva.faixa;
    const renda = input.renda.anualBruto;

    // cálculo direto usando tabela (exemplo simplificado com parcela a deduzir)
    let aliquota = 0, parcela = 0;
    for (const [lim, aliq, parc] of T) {
      if (renda <= lim) { aliquota = aliq; parcela = parc; break; }
    }
    const imposto = renda * aliquota - parcela;
    return makeOutputBase(input, this.name, imposto);
  }
}
