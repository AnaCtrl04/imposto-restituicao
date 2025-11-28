"use strict";
/**
 * SINGLETON: carrega uma vez por ano-calendário as bases e limites.
 * Em produção, poderia ler de BD/arquivo/serviço.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxTableProvider = void 0;
class TaxTableProvider {
    constructor() {
        // cache de configuração por ano-calendário
        this.cache = new Map();
    }
    static getInstance() {
        if (!TaxTableProvider.instance) {
            TaxTableProvider.instance = new TaxTableProvider();
        }
        return TaxTableProvider.instance;
    }
    getForYear(ano) {
        if (!this.cache.has(ano)) {
            // valores-exemplo (ajuste conforme a regra da disciplina)
            const faixas = [
                [22847.76, 0.0, 0.0],
                [33919.80, 0.075, 1713.58],
                [45012.60, 0.15, 4257.57],
                [55976.16, 0.225, 7633.51],
                [Infinity, 0.275, 10432.32],
            ];
            const tabela = {
                progressiva: {
                    faixa: faixas,
                },
                limites: {
                    depAnual: 2280.0, // dedução anual por dependente (exemplo)
                    saudeMax: 5000.0, // teto saúde (exemplo)
                    educacaoMax: 3561.5, // teto educação (exemplo)
                },
            };
            this.cache.set(ano, tabela);
        }
        return this.cache.get(ano);
    }
}
exports.TaxTableProvider = TaxTableProvider;
