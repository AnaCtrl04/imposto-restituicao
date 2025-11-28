"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeductionDecorator = void 0;
const base_calculator_1 = require("../domain/base-calculator");
/**
 * DECORATOR: envolve um calculator e acrescenta deduções.
 */
class DeductionDecorator extends base_calculator_1.BaseTaxCalculator {
    constructor(inner) {
        super(inner["strategy"]);
        this.inner = inner;
    }
    calculate(input) {
        const base = this.inner.calculate(input);
        return this.applyDeduction(base, input);
    }
}
exports.DeductionDecorator = DeductionDecorator;
