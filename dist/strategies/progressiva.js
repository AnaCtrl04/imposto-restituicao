"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressivaStrategy = void 0;
const tax_strategy_js_1 = require("./tax-strategy.js");
const tax_table_provider_js_1 = require("../infra/tax-table-provider.js");
class ProgressivaStrategy {
    constructor() {
        this.name = "progressiva";
    }
    calculate(input) {
        const T = tax_table_provider_js_1.TaxTableProvider.getInstance().getForYear(input.ano).progressiva.faixa;
        const renda = input.renda.anualBruto;
        // cálculo direto usando tabela (exemplo simplificado com parcela a deduzir)
        let aliquota = 0, parcela = 0;
        for (const [lim, aliq, parc] of T) {
            if (renda <= lim) {
                aliquota = aliq;
                parcela = parc;
                break;
            }
        }
        const imposto = renda * aliquota - parcela;
        return (0, tax_strategy_js_1.makeOutputBase)(input, this.name, imposto);
    }
}
exports.ProgressivaStrategy = ProgressivaStrategy;
