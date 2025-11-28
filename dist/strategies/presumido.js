"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresumidoStrategy = void 0;
const tax_strategy_js_1 = require("./tax-strategy.js");
class PresumidoStrategy {
    constructor() {
        this.name = "presumido";
    }
    calculate(input) {
        // Ex.: presume 32% da receita como base; alíquota sobre a base presumida
        const base = input.renda.anualBruto * 0.32;
        const imposto = base * 0.15;
        return (0, tax_strategy_js_1.makeOutputBase)(input, this.name, imposto);
    }
}
exports.PresumidoStrategy = PresumidoStrategy;
