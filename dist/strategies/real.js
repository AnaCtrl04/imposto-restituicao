"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealStrategy = void 0;
const tax_strategy_js_1 = require("./tax-strategy.js");
class RealStrategy {
    constructor() {
        this.name = "real";
    }
    calculate(input) {
        const base = Math.max(0, input.renda.anualBruto - (input.renda.custosDedutiveis ?? 0));
        const imposto = base * 0.12; // ex.: 12% sobre base real
        return (0, tax_strategy_js_1.makeOutputBase)(input, this.name, imposto);
    }
}
exports.RealStrategy = RealStrategy;
