import { BaseTaxCalculator } from "../domain/base-calculator";
import { TaxStrategy } from "../strategies/tax-strategy";
import { SimplesStrategy } from "../strategies/simples";
import { RealStrategy } from "../strategies/real";
import { PresumidoStrategy } from "../strategies/presumido";
import { ProgressivaStrategy } from "../strategies/progressiva";
import { DependenteDeduction } from "../decorators/dependente";
import { SaudeDeduction } from "../decorators/saude";
import { EducacaoDeduction } from "../decorators/educacao";

export type Regime = "simples" | "real" | "presumido" | "progressiva";

export type FactoryOptions = {
  regime: Regime;
  aplicarDependentes?: boolean;
  aplicarSaude?: boolean;
  aplicarEducacao?: boolean;
};

export class TaxCalculatorFactory {
  static make(opts: FactoryOptions): BaseTaxCalculator {
    let strategy: TaxStrategy;
    switch (opts.regime) {
      case "simples":
        strategy = new SimplesStrategy();
        break;
      case "real":
        strategy = new RealStrategy();
        break;
      case "presumido":
        strategy = new PresumidoStrategy();
        break;
      case "progressiva":
        strategy = new ProgressivaStrategy();
        break;
      default:
        throw new Error("Regime inválido");
    }

    let calc = new BaseTaxCalculator(strategy);

    if (opts.aplicarDependentes) calc = new DependenteDeduction(calc);
    if (opts.aplicarSaude) calc = new SaudeDeduction(calc);
    if (opts.aplicarEducacao) calc = new EducacaoDeduction(calc);

    return calc;
  }
}
