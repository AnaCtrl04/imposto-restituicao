"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTaxCalculator = void 0;
class BaseTaxCalculator {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    calculate(input) {
        return this.strategy.calculate(input);
    }
}
exports.BaseTaxCalculator = BaseTaxCalculator;
