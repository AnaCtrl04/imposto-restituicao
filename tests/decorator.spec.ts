import { BaseTaxCalculator } from "../domain/base-calculator";
import { SimplesStrategy } from "../strategies/simples.js";
import { DependenteDeduction } from "../decorators/dependente.js";
import { SaudeDeduction } from "../decorators/saude.js";
import { EducacaoDeduction } from "../decorators/educacao.js";

const input = {
  ano: 2025,
  contribuinte: { nome: "Ana", dependentes: 2 },
  renda: { anualBruto: 50000 },
  deducoes: { dependentes: 2, gastosSaude: 8000, gastosEducacao: 6000 }
};

test("Composição de decorators respeita limites e ordem", () => {
  let calc = new BaseTaxCalculator(new SimplesStrategy()); // 6% de 50k = 3k
  calc = new DependenteDeduction(calc);
  calc = new SaudeDeduction(calc);
  calc = new EducacaoDeduction(calc);

  const out = calc.calculate(input);
  // Limites: dep (2x 2280 = 4560), saude (teto 5000), educacao (teto 3561.5)
  // 3000 - 4560 -> clamp 0 -> mas ainda aplica para verificar campos
  expect(out.impostoDevido).toBe(0);
  expect(out.deducoesAplicadas.dependentes).toBeCloseTo(4560);
  expect(out.deducoesAplicadas.saude).toBeCloseTo(5000);
  expect(out.deducoesAplicadas.educacao).toBeCloseTo(3561.5);
});
