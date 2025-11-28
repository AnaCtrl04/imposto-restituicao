"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const tax_calculator_factory_1 = require("../factory/tax-calculator-factory");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function ask(q) {
    return new Promise((res) => rl.question(q, (ans) => res(ans)));
}
(async () => {
    console.log("=== Sistema de Restituição de Impostos ===");
    console.log("Desenvolvido por: Ana Carolina Pereira Martins\n");
    const ano = Number(await ask("Ano-calendário (ex: 2025): "));
    const nome = await ask("Nome do contribuinte: ");
    const dep = Number(await ask("Qtd de dependentes: "));
    const bruto = Number(await ask("Renda anual bruta: "));
    const custos = Number(await ask("Custos dedutíveis (para regime REAL, senão 0): "));
    console.log("\nRegimes: simples | real | presumido | progressiva");
    const regime = (await ask("Escolha o regime: ")).trim();
    const aplDep = (await ask("Aplicar dedução por dependentes? (s/n): ")).toLowerCase() === "s";
    const gSaude = Number(await ask("Gastos com saúde (0 se não): "));
    const aplSau = gSaude > 0;
    const gEdu = Number(await ask("Gastos com educação (0 se não): "));
    const aplEdu = gEdu > 0;
    const calc = tax_calculator_factory_1.TaxCalculatorFactory.make({
        regime,
        aplicarDependentes: aplDep,
        aplicarSaude: aplSau,
        aplicarEducacao: aplEdu,
    });
    const input = {
        ano,
        contribuinte: { nome, dependentes: dep },
        renda: { anualBruto: bruto, custosDedutiveis: custos },
        deducoes: { dependentes: dep, gastosSaude: gSaude, gastosEducacao: gEdu },
    };
    const out = calc.calculate(input);
    console.log("\n--- Resultado ---");
    console.log(`Ano: ${out.ano}`);
    console.log(`Regime: ${out.regime}`);
    console.log(`Imposto devido (após deduções): R$ ${out.impostoDevido.toFixed(2)}`);
    console.log("Deduções aplicadas:", out.deducoesAplicadas);
    console.log("\nDesenvolvido por: Ana Carolina Pereira Martins");
    rl.close();
})();
