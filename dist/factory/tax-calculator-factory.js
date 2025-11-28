"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxCalculatorFactory = void 0;
const base_calculator_1 = require("../domain/base-calculator");
const simples_1 = require("../strategies/simples");
const real_1 = require("../strategies/real");
const presumido_1 = require("../strategies/presumido");
const progressiva_1 = require("../strategies/progressiva");
const dependente_1 = require("../decorators/dependente");
const saude_1 = require("../decorators/saude");
const educacao_1 = require("../decorators/educacao");
class TaxCalculatorFactory {
    static make(opts) {
        let strategy;
        switch (opts.regime) {
            case "simples":
                strategy = new simples_1.SimplesStrategy();
                break;
            case "real":
                strategy = new real_1.RealStrategy();
                break;
            case "presumido":
                strategy = new presumido_1.PresumidoStrategy();
                break;
            case "progressiva":
                strategy = new progressiva_1.ProgressivaStrategy();
                break;
            default:
                throw new Error("Regime inválido");
        }
        let calc = new base_calculator_1.BaseTaxCalculator(strategy);
        if (opts.aplicarDependentes)
            calc = new dependente_1.DependenteDeduction(calc);
        if (opts.aplicarSaude)
            calc = new saude_1.SaudeDeduction(calc);
        if (opts.aplicarEducacao)
            calc = new educacao_1.EducacaoDeduction(calc);
        return calc;
    }
}
exports.TaxCalculatorFactory = TaxCalculatorFactory;
