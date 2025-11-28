import { TaxTableProvider } from "../infra/tax-table-provider.js";

test("Singleton retorna a mesma instância e cache por ano", () => {
  const a = TaxTableProvider.getInstance();
  const b = TaxTableProvider.getInstance();
  expect(a).toBe(b);

  const t2025a = a.getForYear(2025);
  const t2025b = b.getForYear(2025);
  expect(t2025a).toBe(t2025b);
});

