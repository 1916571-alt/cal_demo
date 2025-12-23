# Implementation Roadmap

## Project Status: Setup Complete ✅

Current Phase: **Ready for Core Implementation**

---

## Overview

This roadmap outlines the implementation plan for the Engineering Calculator project. The project follows **Test-Driven Development (TDD)** for all core logic and **manual testing** for UI components.

### Key Principles
- ✅ **TDD for Core Logic**: All business logic must be developed test-first
- ❌ **No Automated UI Tests**: UI components will be tested manually
- ✅ **SOLID Principles**: All code must follow SOLID design principles
- ✅ **90%+ Test Coverage**: Required for all core logic modules

---

## Phase Summary

| Phase | Description | Est. Time | Status |
|-------|-------------|-----------|--------|
| **Phase 1** | Core Calculator Engine (TDD) | 12-16 hours | 🔴 **START HERE** |
| **Phase 2** | UI Components (Manual Testing) | 10-13 hours | 🟡 Pending |
| **Phase 3** | Converter Mode (TDD + Manual) | 5-7 hours | 🟡 Pending |
| **Phase 4** | Polish & Optimization | 5-7 hours | 🟡 Pending |
| **Phase 5** | Manual QA & Testing | 6-7 hours | 🟡 Pending |
| **Phase 6** | Documentation & Deployment | 3 hours | 🟡 Pending |

**Total Estimated Time**: 35-45 hours

---

## Phase 1: Core Calculator Engine (TDD) 🔴

**Priority**: HIGH | **Time**: 12-16 hours

### Modules to Implement (All with TDD):

#### 1.1 Expression Parser (3-4 hours)
- Parse numbers (single, multi-digit, decimal, negative)
- Convert operator symbols (× → *, ÷ → /)
- Validate parentheses
- Handle implicit multiplication
- Edge case handling
- **Deliverable**: `src/core/ExpressionParser.js` with 90%+ coverage
- **[Detailed Tasks →](./docs/tasks/phase1-1-expression-parser.md)**

#### 1.2 Calculator Engine (4-5 hours)
- Basic arithmetic (+ - × ÷)
- Order of operations (PEMDAS)
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (log, ln)
- Algebraic functions (sqrt, power)
- Constants (π, e)
- Error handling
- Result formatting
- **Deliverable**: `src/core/CalculatorEngine.js` with 90%+ coverage
- **[Detailed Tasks →](./docs/tasks/phase1-2-calculator-engine.md)**

#### 1.3 State Manager (3-4 hours)
- State initialization
- State updates (immutable)
- Subscription system (Observer pattern)
- localStorage persistence
- History management
- Reset functionality
- **Deliverable**: `src/core/StateManager.js` with 90%+ coverage
- **[Detailed Tasks →](./docs/tasks/phase1-3-state-manager.md)**

#### 1.4 Utility Functions (2-3 hours)
- Number/expression formatters
- Input validators
- Helper functions (debounce, memoize)
- **Deliverable**: `src/utils/` modules with 90%+ coverage
- **[Detailed Tasks →](./docs/tasks/phase1-4-utilities.md)**

---

## Phase 2: UI Components (Manual Testing) 🟡

**Priority**: HIGH | **Time**: 10-13 hours

### Components to Build:

- **Display Component** (2-3 hours) - History line, main result, error states
- **Keypad Component** (3-4 hours) - Number/operator/control buttons
- **Function Chips** (1-2 hours) - Scrollable function buttons
- **Header Component** (1 hour) - Menu, title, angle mode toggle
- **Mode Switch** (1 hour) - Calculator/Converter tabs
- **App Integration** (2-3 hours) - Wire everything together, keyboard support

**Testing**: Manual testing only (no automated UI tests)

---

## Phase 3: Converter Mode 🟡

**Priority**: MEDIUM | **Time**: 5-7 hours

- **Converter Engine (TDD)** (3-4 hours) - Unit conversions with 90%+ coverage
- **Converter UI (Manual)** (2-3 hours) - Input/output fields, unit selectors

---

## Phase 4: Polish & Optimization 🟡

**Priority**: MEDIUM | **Time**: 5-7 hours

- Theme system (Light/Dark mode)
- Animations & transitions
- Accessibility (WCAG 2.1 AA)
- Performance optimization (< 200KB bundle, < 3s TTI)

**Testing**: Manual testing only

---

## Phase 5: Manual QA 🟡

**Priority**: HIGH | **Time**: 6-7 hours

- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile testing (iOS, Android)
- Feature testing (all calculator functions)
- Accessibility testing

**No automated E2E or integration tests**

---

## Phase 6: Documentation & Deployment 🟡

**Priority**: MEDIUM | **Time**: 3 hours

- Update README with screenshots
- Add JSDoc comments
- Create user guide
- Final deployment to GitHub Pages

---

## Testing Strategy

### ✅ TDD (Test-Driven Development)
**Required for**:
- `src/core/ExpressionParser.js`
- `src/core/CalculatorEngine.js`
- `src/core/StateManager.js`
- `src/core/ConverterEngine.js`
- `src/utils/*`

**Coverage Requirement**: 90%+

### ❌ No Automated UI Tests
**Manual testing only for**:
- All `src/components/*`
- UI integration
- Visual appearance
- User interactions

### ✅ Manual Testing
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility
- Feature verification

---

## Current Priority

### 🎯 Next Steps (Phase 1.1 - Expression Parser)

1. **Setup**
   ```bash
   npm install
   npm run test:watch
   ```

2. **Create test file**
   - `tests/unit/core/ExpressionParser.test.js`

3. **Start TDD cycle**
   - Write failing test (RED)
   - Write minimal code to pass (GREEN)
   - Refactor (REFACTOR)
   - Repeat

4. **Follow detailed tasks**
   - See `docs/tasks/phase1-1-expression-parser.md` for step-by-step guide

---

## Development Workflow

```bash
# Terminal 1: Test watcher (for TDD)
npm run test:watch

# Terminal 2: Dev server (when ready for UI)
npm run dev

# Check coverage
npm run test:coverage

# Lint code
npm run lint
```

---

## Progress Tracking

- [ ] **Phase 1**: Core Calculator Engine (TDD)
  - [ ] 1.1 Expression Parser
  - [ ] 1.2 Calculator Engine
  - [ ] 1.3 State Manager
  - [ ] 1.4 Utilities

- [ ] **Phase 2**: UI Components
- [ ] **Phase 3**: Converter Mode
- [ ] **Phase 4**: Polish & Optimization
- [ ] **Phase 5**: Manual QA
- [ ] **Phase 6**: Documentation & Deployment

---

## Related Documents

- **[PRD.md](./PRD.md)** - Product Requirements Document
- **[TECH_SPEC.md](./TECH_SPEC.md)** - Technical Specification
- **[DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md)** - TDD & SOLID Guidelines
- **[.agent/rules/tdd.md](./.agent/rules/tdd.md)** - TDD Rules
- **[.agent/rules/solid.md](./.agent/rules/solid.md)** - SOLID Principles

### Detailed Task Lists
- **[Phase 1.1 Tasks](./docs/tasks/phase1-1-expression-parser.md)** - Expression Parser (24 tasks)
- **[Phase 1.2 Tasks](./docs/tasks/phase1-2-calculator-engine.md)** - Calculator Engine (50 tasks)
- **[Phase 1.3 Tasks](./docs/tasks/phase1-3-state-manager.md)** - State Manager (34 tasks)
- **[Phase 1.4 Tasks](./docs/tasks/phase1-4-utilities.md)** - Utilities (14 tasks)

---

**Last Updated**: 2025-12-23  
**Status**: Ready to start Phase 1.1 - Expression Parser  
**Next Action**: Run `npm install` and `npm run test:watch`
