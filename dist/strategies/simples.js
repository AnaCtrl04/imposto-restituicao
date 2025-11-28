"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimplesStrategy = void 0;
const tax_strategy_js_1 = require("./tax-strategy.js");
class SimplesStrategy {
    constructor() {
        this.name = "simples";
    }
    calculate(input) {
        // Ex.: 6% fixo sobre renda anual (exemplo acadêmico)
        const imposto = input.renda.anualBruto * 0.06;
        return (0, tax_strategy_js_1.makeOutputBase)(input, this.name, imposto);
    }
}
exports.SimplesStrategy = SimplesStrategy;
