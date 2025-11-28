"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tax_table_provider_js_1 = require("../infra/tax-table-provider.js");
test("Singleton retorna a mesma instância e cache por ano", () => {
    const a = tax_table_provider_js_1.TaxTableProvider.getInstance();
    const b = tax_table_provider_js_1.TaxTableProvider.getInstance();
    expect(a).toBe(b);
    const t2025a = a.getForYear(2025);
    const t2025b = b.getForYear(2025);
    expect(t2025a).toBe(t2025b);
});
