"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_calculator_1 = require("../domain/base-calculator");
const simples_js_1 = require("../strategies/simples.js");
const real_js_1 = require("../strategies/real.js");
const baseInput = {
    ano: 2025,
    contribuinte: { nome: "Teste", dependentes: 0 },
    renda: { anualBruto: 100000, custosDedutiveis: 20000 }
};
test("Strategy troca dinâmica: simples -> real", () => {
    const calc = new base_calculator_1.BaseTaxCalculator(new simples_js_1.SimplesStrategy());
    const out1 = calc.calculate(baseInput);
    expect(out1.regime).toBe("simples");
    expect(out1.impostoDevido).toBeCloseTo(6000); // 6%
    calc.setStrategy(new real_js_1.RealStrategy());
    const out2 = calc.calculate(baseInput);
    expect(out2.regime).toBe("real");
    // base = 100k - 20k = 80k; 12% = 9600
    expect(out2.impostoDevido).toBeCloseTo(9600);
});
