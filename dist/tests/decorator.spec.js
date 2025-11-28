"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_calculator_1 = require("../domain/base-calculator");
const simples_js_1 = require("../strategies/simples.js");
const dependente_js_1 = require("../decorators/dependente.js");
const saude_js_1 = require("../decorators/saude.js");
const educacao_js_1 = require("../decorators/educacao.js");
const input = {
    ano: 2025,
    contribuinte: { nome: "Ana", dependentes: 2 },
    renda: { anualBruto: 50000 },
    deducoes: { dependentes: 2, gastosSaude: 8000, gastosEducacao: 6000 }
};
test("Composição de decorators respeita limites e ordem", () => {
    let calc = new base_calculator_1.BaseTaxCalculator(new simples_js_1.SimplesStrategy()); // 6% de 50k = 3k
    calc = new dependente_js_1.DependenteDeduction(calc);
    calc = new saude_js_1.SaudeDeduction(calc);
    calc = new educacao_js_1.EducacaoDeduction(calc);
    const out = calc.calculate(input);
    // Limites: dep (2x 2280 = 4560), saude (teto 5000), educacao (teto 3561.5)
    // 3000 - 4560 -> clamp 0 -> mas ainda aplica para verificar campos
    expect(out.impostoDevido).toBe(0);
    expect(out.deducoesAplicadas.dependentes).toBeCloseTo(4560);
    expect(out.deducoesAplicadas.saude).toBeCloseTo(5000);
    expect(out.deducoesAplicadas.educacao).toBeCloseTo(3561.5);
});
