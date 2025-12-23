# SOLID Principles Rule

## Mandatory SOLID Principles

All code **MUST** follow SOLID principles for maintainability and scalability.

---

## S - Single Responsibility Principle (SRP)

**Rule**: A class should have only one reason to change.

### ✅ Good Example
```javascript
// Each class has a single responsibility
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

### ❌ Bad Example
```javascript
// Multiple responsibilities in one class
class Calculator {
  evaluate(expr) { /* ... */ }
  saveToHistory(expr, result) { /* ... */ }
  formatDisplay(value) { /* ... */ }
}
```

---

## O - Open/Closed Principle (OCP)

**Rule**: Classes should be open for extension but closed for modification.

### ✅ Good Example
```javascript
class Operation {
  execute(a, b) {
    throw new Error('Must implement execute');
  }
}

class Addition extends Operation {
  execute(a, b) { return a + b; }
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

---

## L - Liskov Substitution Principle (LSP)

**Rule**: Derived classes must be substitutable for their base classes.

### ✅ Good Example
```javascript
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
    if (expr.includes('sin')) {
      return this.evaluateTrigonometric(expr);
    }
    return super.parse(expr);
  }
}
```

---

## I - Interface Segregation Principle (ISP)

**Rule**: Clients should not be forced to depend on interfaces they don't use.

### ✅ Good Example
```javascript
// Segregated interfaces
class LocalStorageManager {
  save(data) { /* ... */ }
  load() { /* ... */ }
}

class SessionStorageManager {
  save(data) { /* ... */ }
  load() { /* ... */ }
}
```

---

## D - Dependency Inversion Principle (DIP)

**Rule**: Depend on abstractions, not concretions.

### ✅ Good Example
```javascript
// Dependency Injection
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

### ❌ Bad Example
```javascript
// Hard dependency
class CalculatorApp {
  constructor() {
    this.engine = new CalculatorEngine(); // Hard-coded
  }
}
```

---

## Code Review Checklist

Before committing, ensure:

### SOLID Checklist
- [ ] Each class has a single, well-defined responsibility
- [ ] New functionality doesn't require modifying existing classes
- [ ] Derived classes can replace base classes without breaking behavior
- [ ] No class is forced to implement unused methods
- [ ] Dependencies are injected, not hard-coded

### Quality Checklist
- [ ] Code is self-documenting with clear names
- [ ] Complex logic has explanatory comments
- [ ] No code duplication (DRY principle)
- [ ] Functions are small and focused (< 50 lines)
- [ ] Cyclomatic complexity is low (< 10)
