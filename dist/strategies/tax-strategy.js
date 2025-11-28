"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOutputBase = makeOutputBase;
/** Utilitário comum: zera deduções; Decorators preencherão depois */
function makeOutputBase(input, regime, imposto) {
    return {
        ano: input.ano,
        regime,
        impostoDevido: Math.max(0, Number(imposto.toFixed(2))),
        deducoesAplicadas: { dependentes: 0, saude: 0, educacao: 0 },
    };
}
