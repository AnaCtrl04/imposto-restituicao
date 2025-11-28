import { BaseTaxCalculator } from "../domain/base-calculator";
import { SimplesStrategy } from "../strategies/simples.js";
import { RealStrategy } from "../strategies/real.js";

const baseInput = {
  ano: 2025,
  contribuinte: { nome: "Teste", dependentes: 0 },
  renda: { anualBruto: 100000, custosDedutiveis: 20000 }
};

test("Strategy troca dinâmica: simples -> real", () => {
  const calc = new BaseTaxCalculator(new SimplesStrategy());
  const out1 = calc.calculate(baseInput);
  expect(out1.regime).toBe("simples");
  expect(out1.impostoDevido).toBeCloseTo(6000); // 6%

  calc.setStrategy(new RealStrategy());
  const out2 = calc.calculate(baseInput);
  expect(out2.regime).toBe("real");
  // base = 100k - 20k = 80k; 12% = 9600
  expect(out2.impostoDevido).toBeCloseTo(9600);
});
