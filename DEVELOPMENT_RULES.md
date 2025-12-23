# Development Rules

## Core Principles

### 1. Test-Driven Development (TDD)

All core logic (non-UI components) **MUST** be developed using Test-Driven Development.

#### TDD Workflow

```
1. Write a failing test (RED)
   ↓
2. Write minimal code to pass the test (GREEN)
   ↓
3. Refactor while keeping tests green (REFACTOR)
   ↓
4. Repeat
```

#### TDD Scope

**Required for TDD:**
- ✅ Calculator Engine (`CalculatorEngine.js`)
- ✅ Expression Parser (`ExpressionParser.js`)
- ✅ State Manager (`StateManager.js`)
- ✅ Converter Engine (`ConverterEngine.js`)
- ✅ Utility functions (`utils/`)
- ✅ Storage managers (`storage/`)

**Not required for TDD (UI Components):**
- ❌ Display Component
- ❌ Keypad Component
- ❌ Header Component
- ❌ Other UI components

#### TDD Best Practices

1. **Write test first**: Never write production code without a failing test
2. **One test at a time**: Focus on one behavior per test
3. **Small steps**: Make incremental changes
4. **Test behavior, not implementation**: Focus on what, not how
5. **Keep tests simple**: Tests should be easier to understand than the code they test

#### Test Structure

```javascript
describe('FeatureName', () => {
  describe('specificBehavior', () => {
    it('should do something specific when condition', () => {
      // Arrange: Set up test data
      const input = 'test';
      
      // Act: Execute the behavior
      const result = functionUnderTest(input);
      
      // Assert: Verify the outcome
      expect(result).toBe('expected');
    });
  });
});
```

---

### 2. SOLID Principles

All code **MUST** follow SOLID principles for maintainability and scalability.

#### S - Single Responsibility Principle (SRP)

**Rule**: A class should have only one reason to change.

**Example:**
```javascript
// ❌ BAD: Multiple responsibilities
class Calculator {
  evaluate(expr) { /* ... */ }
  saveToHistory(expr, result) { /* ... */ }
  formatDisplay(value) { /* ... */ }
}

// ✅ GOOD: Single responsibility
class CalculatorEngine {
  evaluate(expr) { /* ... */ }
}

class HistoryStore {
  save(entry) { /* ... */ }
}

class DisplayFormatter {
  format(value) { /* ... */ }
}
```

#### O - Open/Closed Principle (OCP)

**Rule**: Classes should be open for extension but closed for modification.

**Example:**
```javascript
// ❌ BAD: Must modify class to add new operations
class Calculator {
  calculate(a, b, operation) {
    if (operation === 'add') return a + b;
    if (operation === 'subtract') return a - b;
    // Need to modify this class to add new operations
  }
}

// ✅ GOOD: Extensible without modification
class Operation {
  execute(a, b) {
    throw new Error('Must implement execute');
  }
}

class Addition extends Operation {
  execute(a, b) { return a + b; }
}

class Subtraction extends Operation {
  execute(a, b) { return a - b; }
}

class Calculator {
  constructor() {
    this.operations = new Map();
  }
  
  registerOperation(name, operation) {
    this.operations.set(name, operation);
  }
  
  calculate(a, b, operationName) {
    const operation = this.operations.get(operationName);
    return operation.execute(a, b);
  }
}
```

#### L - Liskov Substitution Principle (LSP)

**Rule**: Derived classes must be substitutable for their base classes.

**Example:**
```javascript
// ❌ BAD: Violates LSP
class Calculator {
  evaluate(expr) {
    return parseFloat(expr);
  }
}

class ScientificCalculator extends Calculator {
  evaluate(expr) {
    if (expr.includes('sin')) {
      throw new Error('Use evaluateScientific instead');
    }
    return super.evaluate(expr);
  }
}

// ✅ GOOD: Follows LSP
class Calculator {
  evaluate(expr) {
    return this.parse(expr);
  }
  
  parse(expr) {
    return parseFloat(expr);
  }
}

class ScientificCalculator extends Calculator {
  parse(expr) {
    // Extends behavior without breaking contract
    if (expr.includes('sin')) {
      return this.evaluateTrigonometric(expr);
    }
    return super.parse(expr);
  }
  
  evaluateTrigonometric(expr) {
    // Implementation
  }
}
```

#### I - Interface Segregation Principle (ISP)

**Rule**: Clients should not be forced to depend on interfaces they don't use.

**Example:**
```javascript
// ❌ BAD: Fat interface
class StorageManager {
  saveToLocalStorage(data) { /* ... */ }
  saveToSessionStorage(data) { /* ... */ }
  saveToIndexedDB(data) { /* ... */ }
  syncToCloud(data) { /* ... */ }
}

// ✅ GOOD: Segregated interfaces
class LocalStorageManager {
  save(data) { /* ... */ }
  load() { /* ... */ }
}

class SessionStorageManager {
  save(data) { /* ... */ }
  load() { /* ... */ }
}

class CloudSyncManager {
  sync(data) { /* ... */ }
}
```

#### D - Dependency Inversion Principle (DIP)

**Rule**: Depend on abstractions, not concretions.

**Example:**
```javascript
// ❌ BAD: Depends on concrete implementation
class CalculatorApp {
  constructor() {
    this.engine = new CalculatorEngine(); // Hard dependency
  }
}

// ✅ GOOD: Depends on abstraction
class CalculatorApp {
  constructor(engine) {
    this.engine = engine; // Injected dependency
  }
}

// Usage
const engine = new CalculatorEngine();
const app = new CalculatorApp(engine);

// Easy to test with mock
const mockEngine = new MockCalculatorEngine();
const testApp = new CalculatorApp(mockEngine);
```

---

## Code Review Checklist

Before committing code, ensure:

### TDD Checklist
- [ ] All core logic has corresponding tests
- [ ] Tests were written before implementation
- [ ] All tests pass
- [ ] Test coverage is > 90% for core logic
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] Tests are independent and can run in any order

### SOLID Checklist
- [ ] Each class has a single, well-defined responsibility
- [ ] New functionality doesn't require modifying existing classes
- [ ] Derived classes can replace base classes without breaking behavior
- [ ] No class is forced to implement unused methods
- [ ] Dependencies are injected, not hard-coded

### General Quality
- [ ] Code is self-documenting with clear names
- [ ] Complex logic has explanatory comments
- [ ] No code duplication (DRY principle)
- [ ] Functions are small and focused
- [ ] Error handling is comprehensive

---

## Testing Standards

### Test File Organization

```
tests/
├── unit/
│   ├── core/
│   │   ├── CalculatorEngine.test.js
│   │   ├── ExpressionParser.test.js
│   │   └── StateManager.test.js
│   ├── utils/
│   │   ├── formatter.test.js
│   │   └── validator.test.js
│   └── storage/
│       ├── LocalStorageManager.test.js
│       └── HistoryStore.test.js
├── integration/
│   └── calculator-flow.test.js
└── e2e/
    └── calculator.spec.js
```

### Test Naming Convention

```javascript
// Pattern: describe('ClassName', () => { describe('methodName', () => { it('should...') }) })

describe('CalculatorEngine', () => {
  describe('evaluate', () => {
    it('should return 5 when evaluating "2 + 3"', () => {
      // Test implementation
    });
    
    it('should throw error when expression is invalid', () => {
      // Test implementation
    });
  });
});
```

### Coverage Requirements

- **Unit Tests**: 90%+ coverage for core logic
- **Integration Tests**: All critical user flows
- **E2E Tests**: All major features

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for TDD)
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm test CalculatorEngine.test.js
```

---

## Development Workflow

### 1. Starting a New Feature

```bash
# 1. Create feature branch
git checkout -b feature/calculator-engine

# 2. Start test watcher
npm run test:watch

# 3. Follow TDD cycle
# - Write failing test
# - Write minimal code to pass
# - Refactor
# - Repeat
```

### 2. Implementation Process

```
For each new behavior:
1. Write a failing test (RED)
2. Run tests to confirm failure
3. Write minimal code to pass (GREEN)
4. Run tests to confirm pass
5. Refactor while keeping tests green (REFACTOR)
6. Commit with meaningful message
```

### 3. Before Committing

```bash
# 1. Run all tests
npm test

# 2. Check coverage
npm run test:coverage

# 3. Lint code
npm run lint

# 4. Review SOLID principles
# - Check each class has single responsibility
# - Verify dependencies are injected
# - Ensure code is extensible

# 5. Commit
git add .
git commit -m "feat: implement calculator engine with TDD"
```

---

## Examples

### Example 1: TDD for Calculator Engine

```javascript
// Step 1: Write failing test (RED)
describe('CalculatorEngine', () => {
  describe('evaluate', () => {
    it('should add two numbers', () => {
      const calculator = new CalculatorEngine();
      expect(calculator.evaluate('2 + 3')).toBe(5);
    });
  });
});

// Step 2: Write minimal code to pass (GREEN)
class CalculatorEngine {
  evaluate(expression) {
    const [a, op, b] = expression.split(' ');
    if (op === '+') {
      return parseFloat(a) + parseFloat(b);
    }
  }
}

// Step 3: Refactor (REFACTOR)
class CalculatorEngine {
  evaluate(expression) {
    return this.parser.parse(expression);
  }
}
```

### Example 2: SOLID Implementation

```javascript
// Single Responsibility
class CalculatorEngine {
  constructor(parser, evaluator) {
    this.parser = parser;      // Dependency Injection
    this.evaluator = evaluator; // Dependency Injection
  }
  
  evaluate(expression) {
    const tokens = this.parser.parse(expression);
    return this.evaluator.evaluate(tokens);
  }
}

// Open/Closed
class ExpressionParser {
  constructor() {
    this.tokenizers = [];
  }
  
  addTokenizer(tokenizer) {
    this.tokenizers.push(tokenizer);
  }
  
  parse(expression) {
    // Use registered tokenizers
  }
}

// Interface Segregation
class BasicCalculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}

class ScientificCalculator extends BasicCalculator {
  sin(x) { return Math.sin(x); }
  cos(x) { return Math.cos(x); }
}
```

---

## Enforcement

These rules are **mandatory** for all core logic development. Code reviews will reject:

1. ❌ Core logic without tests
2. ❌ Tests written after implementation
3. ❌ Classes with multiple responsibilities
4. ❌ Hard-coded dependencies
5. ❌ Code that violates SOLID principles

---

## Resources

### TDD
- [Test-Driven Development by Example](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
- [The Three Rules of TDD](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd)

### SOLID
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

---

**Last Updated**: 2025-12-23  
**Status**: Active
