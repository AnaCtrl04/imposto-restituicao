"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducacaoDeduction = void 0;
const deduction_decorator_js_1 = require("./deduction-decorator.js");
const tax_table_provider_js_1 = require("../infra/tax-table-provider.js");
class EducacaoDeduction extends deduction_decorator_js_1.DeductionDecorator {
    applyDeduction(out, input) {
        const bruto = input.deducoes?.gastosEducacao ?? 0;
        const teto = tax_table_provider_js_1.TaxTableProvider.getInstance().getForYear(input.ano).limites.educacaoMax;
        const deduc = Math.min(bruto, teto);
        return {
            ...out,
            impostoDevido: Math.max(0, Number((out.impostoDevido - deduc).toFixed(2))),
            deducoesAplicadas: {
                ...out.deducoesAplicadas,
                educacao: Number(deduc.toFixed(2))
            }
        };
    }
}
exports.EducacaoDeduction = EducacaoDeduction;
