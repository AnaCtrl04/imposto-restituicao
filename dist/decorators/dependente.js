"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependenteDeduction = void 0;
const deduction_decorator_js_1 = require("./deduction-decorator.js");
const tax_table_provider_js_1 = require("../infra/tax-table-provider.js");
class DependenteDeduction extends deduction_decorator_js_1.DeductionDecorator {
    applyDeduction(out, input) {
        const qtd = input.deducoes?.dependentes ?? input.contribuinte.dependentes ?? 0;
        const depUnit = tax_table_provider_js_1.TaxTableProvider.getInstance().getForYear(input.ano).limites.depAnual;
        const deduc = depUnit * qtd;
        return {
            ...out,
            impostoDevido: Math.max(0, Number((out.impostoDevido - deduc).toFixed(2))),
            deducoesAplicadas: {
                ...out.deducoesAplicadas,
                dependentes: Number(deduc.toFixed(2))
            }
        };
    }
}
exports.DependenteDeduction = DependenteDeduction;
