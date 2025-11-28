import { TaxCalculatorFactory } from "../factory/tax-calculator-factory";

const input = {
  ano: 2025,
  contribuinte: { nome: "Carol", dependentes: 1 },
  renda: { anualBruto: 40000, custosDedutiveis: 0 },
  deducoes: { dependentes: 1, gastosSaude: 1000, gastosEducacao: 1000 }
};

test("Factory cria composição com strategy + decorators", () => {
  const calc = TaxCalculatorFactory.make({
    regime: "progressiva",
    aplicarDependentes: true,
    aplicarSaude: true,
    aplicarEducacao: true
  });

  const out = calc.calculate(input);
  expect(out.regime).toBe("progressiva");
  expect(out.deducoesAplicadas.dependentes).toBeGreaterThanOrEqual(0);
  expect(out.deducoesAplicadas.saude).toBeGreaterThan(0);
  expect(out.deducoesAplicadas.educacao).toBeGreaterThan(0);
});
