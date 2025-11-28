Sistema de Restituição de Impostos

Desenvolvido por: Ana Carolina Pereira Martins

1. Descrição do Projeto

O sistema implementa o cálculo de imposto devido por diferentes regimes tributários, incluindo deduções legais (dependentes, saúde e educação). A aplicação foi desenvolvida em TypeScript, seguindo princípios de orientação a objetos e utilizando padrões de projeto exigidos pela disciplina.

A interface é um CLI (Command Line Interface) executado via terminal.

2. Padrões de Projeto Implementados
Strategy

Utilizado para definir múltiplos regimes de cálculo de imposto de forma intercambiável, permitindo substituição dinâmica das regras de cálculo.
Estratégias implementadas: simples, real, presumido, progressiva.

Decorator

Empregado para compor deduções adicionais sem modificar a classe base. As deduções são aplicadas em camadas independentes (dependentes, saúde, educação), preservando extensibilidade.

Singleton

Aplicado ao componente TaxTableProvider, responsável por fornecer tabelas e limites tributários. Garante que os dados sejam carregados uma única vez por ano-calendário.

Factory Method (opcional)

Utilizado para construir automaticamente a combinação adequada de Strategy e Decorators conforme as opções selecionadas no CLI.

3. Estrutura do Projeto
app/          → Interface CLI
domain/       → Tipos e calculadora base
strategies/   → Estratégias de cálculo (Strategy)
decorators/   → Deduções em camadas (Decorator)
infra/        → Tabela de impostos (Singleton)
factory/      → Criação da calculadora (Factory Method)
tests/        → Testes de unidade (Jest)

4. Execução
Instalação
npm install

Execução do CLI
npm start

Testes unitários
npm test

5. Testes Implementados

Os testes verificam:

troca dinâmica de estratégias (Strategy);

aplicação correta e limitada das deduções (Decorator);

unicidade da instância do Singleton;

criação adequada via Factory Method.

6. Decisões de Design

Modularização clara para facilitar extensão futura.

Uso dos padrões para reduzir acoplamento e aumentar reutilização.

Separação completa entre lógica de cálculo, estratégias, deduções e interface.

7. Diagrama Simplificado
classDiagram
  BaseTaxCalculator --> TaxStrategy
  TaxStrategy <|.. SimplesStrategy
  TaxStrategy <|.. RealStrategy
  TaxStrategy <|.. PresumidoStrategy
  TaxStrategy <|.. ProgressivaStrategy

  DeductionDecorator --> BaseTaxCalculator
  DependenteDeduction --|> DeductionDecorator
  SaudeDeduction --|> DeductionDecorator
  EducacaoDeduction --|> DeductionDecorator

  BaseTaxCalculator --> TaxTableProvider
  TaxTableProvider : <<Singleton>>

  TaxCalculatorFactory --> BaseTaxCalculator
