# Test-Driven Development (TDD) Rule

## Mandatory TDD for Core Logic

All core logic (non-UI components) **MUST** be developed using Test-Driven Development.

### TDD Workflow

```
1. Write a failing test (RED)
   ↓
2. Write minimal code to pass the test (GREEN)
   ↓
3. Refactor while keeping tests green (REFACTOR)
   ↓
4. Repeat
```

### Scope

**TDD Required:**
- ✅ `src/core/CalculatorEngine.js`
- ✅ `src/core/ExpressionParser.js`
- ✅ `src/core/StateManager.js`
- ✅ `src/core/ConverterEngine.js`
- ✅ All files in `src/utils/`
- ✅ All files in `src/storage/`

**TDD NOT Required (UI Components):**
- ❌ `src/components/` (Display, Keypad, Header, etc.)

### Rules

1. **Never write production code without a failing test first**
2. **Write only enough test to fail** (compilation failure counts as failure)
3. **Write only enough production code to pass the test**
4. **Keep tests simple** - Tests should be easier to understand than the code
5. **One test at a time** - Focus on one behavior per test
6. **Test behavior, not implementation** - Focus on what, not how

### Coverage Requirements

- **Core Logic**: 90%+ coverage required
- **UI Components**: Not required for coverage

### Commands

```bash
# Start TDD workflow (watch mode)
npm run test:watch

# Run all tests
npm test

# Check coverage
npm run test:coverage
```

### Before Committing

- [ ] All tests pass
- [ ] Coverage meets 90% threshold for core logic
- [ ] No production code exists without corresponding tests
- [ ] Tests were written BEFORE implementation
