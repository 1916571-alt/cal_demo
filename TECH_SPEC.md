# Technical Specification Document
## Engineering Calculator

---

## Document Information

**Version**: 1.0  
**Last Updated**: 2025-12-23  
**Status**: Draft  
**Related Documents**: [PRD.md](./PRD.md)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technology Stack](#2-technology-stack)
3. [System Architecture](#3-system-architecture)
4. [Data Structures](#4-data-structures)
5. [Core Modules](#5-core-modules)
6. [API Specifications](#6-api-specifications)
7. [State Management](#7-state-management)
8. [UI Component Library](#8-ui-component-library)
9. [Calculation Engine](#9-calculation-engine)
10. [Testing Strategy](#10-testing-strategy)
11. [Build & Deployment](#11-build--deployment)
12. [Performance Optimization](#12-performance-optimization)
13. [Security Considerations](#13-security-considerations)
14. [Development Guidelines](#14-development-guidelines)

---

## 1. Executive Summary

This technical specification defines the implementation details for the Engineering Calculator web application. The application will be built as a modern, single-page application (SPA) using vanilla JavaScript with Tailwind CSS for styling, prioritizing performance, maintainability, and user experience.

### 1.1 Key Technical Decisions

- **Framework**: Vanilla JavaScript (no framework overhead)
- **Styling**: Tailwind CSS v3.x (utility-first approach)
- **Build Tool**: Vite (fast development and optimized production builds)
- **Calculation Engine**: math.js library for precision and advanced functions
- **State Management**: Custom lightweight state manager
- **Testing**: Vitest + Playwright for unit and E2E testing

---

## 2. Technology Stack

### 2.1 Core Technologies

#### Frontend
```json
{
  "runtime": "Browser (ES2020+)",
  "language": "JavaScript (ES6+)",
  "markup": "HTML5",
  "styling": "CSS3 + Tailwind CSS v3.4+"
}
```

#### Build Tools
```json
{
  "bundler": "Vite 5.x",
  "package-manager": "npm 10.x",
  "transpiler": "esbuild (via Vite)",
  "css-processor": "PostCSS + Autoprefixer"
}
```

### 2.2 Dependencies

#### Production Dependencies
```json
{
  "dependencies": {
    "mathjs": "^12.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

#### Development Dependencies
```json
{
  "devDependencies": {
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "@playwright/test": "^1.40.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

### 2.3 External Resources

#### Fonts (Google Fonts CDN)
- **Space Grotesk**: Display font for UI elements
- **Noto Sans**: Body font for content

#### Icons
- **Material Symbols Outlined**: Google's icon font

#### Rationale
- **CDN delivery**: Faster loading, browser caching
- **No build step**: Simplifies font management
- **Fallback fonts**: System fonts as backup

---

## 3. System Architecture

### 3.1 Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Display    │  │   Keypad     │  │   Controls   │  │
│  │  Component   │  │  Component   │  │  Component   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                      Business Logic                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │    State     │  │  Calculator  │  │  Converter   │  │
│  │   Manager    │  │    Engine    │  │    Engine    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                       Data Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ LocalStorage │  │   History    │  │ Preferences  │  │
│  │   Manager    │  │    Store     │  │    Store     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Module Structure

```
src/
├── main.js                 # Application entry point
├── app.js                  # Main application controller
├── components/             # UI Components
│   ├── Display.js
│   ├── Keypad.js
│   ├── FunctionChips.js
│   ├── Header.js
│   └── ModeSwitch.js
├── core/                   # Business Logic
│   ├── CalculatorEngine.js
│   ├── ConverterEngine.js
│   ├── ExpressionParser.js
│   └── StateManager.js
├── utils/                  # Utilities
│   ├── formatter.js
│   ├── validator.js
│   ├── constants.js
│   └── helpers.js
├── storage/                # Data Persistence
│   ├── LocalStorageManager.js
│   ├── HistoryStore.js
│   └── PreferencesStore.js
└── styles/                 # Styling
    ├── main.css
    └── components/
        ├── display.css
        ├── keypad.css
        └── chips.css
```

### 3.3 Data Flow

```
User Input → Event Handler → State Manager → Calculator Engine
                                    ↓
                            Update Display Component
                                    ↓
                            Persist to LocalStorage
```

---

## 4. Data Structures

### 4.1 Application State

```typescript
interface AppState {
  // Current calculation state
  currentValue: string;           // Current display value
  previousValue: string;          // Previous operand
  operator: string | null;        // Current operator (+, -, ×, ÷)
  expression: string;             // Full expression string
  
  // History
  history: CalculationHistory[];  // Past calculations
  
  // Settings
  angleMode: 'DEG' | 'RAD';      // Angle mode for trig functions
  theme: 'light' | 'dark';       // UI theme
  mode: 'calculator' | 'converter'; // App mode
  
  // UI State
  isResultDisplayed: boolean;    // Whether showing result
  hasError: boolean;             // Error state
  errorMessage: string | null;   // Error message
}
```

### 4.2 Calculation History

```typescript
interface CalculationHistory {
  id: string;                    // Unique identifier (timestamp)
  expression: string;            // Input expression
  result: string;                // Calculated result
  timestamp: number;             // Unix timestamp
  angleMode: 'DEG' | 'RAD';     // Mode used for calculation
}
```

### 4.3 Button Configuration

```typescript
interface ButtonConfig {
  id: string;                    // Unique button identifier
  label: string;                 // Display text
  value: string;                 // Value to insert
  type: 'number' | 'operator' | 'function' | 'control';
  category?: 'basic' | 'advanced' | 'trig' | 'log';
  gridColumn?: number;           // Grid column span
  className?: string;            // Custom CSS classes
  action?: () => void;           // Custom action handler
}
```

### 4.4 Converter Unit

```typescript
interface ConversionUnit {
  id: string;                    // Unique unit ID
  name: string;                  // Display name
  symbol: string;                // Unit symbol
  category: string;              // Category (length, weight, etc.)
  toBase: (value: number) => number;  // Convert to base unit
  fromBase: (value: number) => number; // Convert from base unit
}
```

---

## 5. Core Modules

### 5.1 Calculator Engine

**File**: `src/core/CalculatorEngine.js`

#### Responsibilities
- Evaluate mathematical expressions
- Handle operator precedence
- Manage trigonometric functions
- Handle special functions (log, ln, sqrt, etc.)

#### Key Methods

```javascript
class CalculatorEngine {
  constructor(angleMode = 'DEG') {
    this.angleMode = angleMode;
    this.math = math.create(math.all);
    this.configureAngleMode();
  }

  /**
   * Evaluate a mathematical expression
   * @param {string} expression - The expression to evaluate
   * @returns {number} The result
   * @throws {Error} If expression is invalid
   */
  evaluate(expression) {
    try {
      // Preprocess expression (convert symbols, handle implicit multiplication)
      const processed = this.preprocessExpression(expression);
      
      // Evaluate using math.js
      const result = this.math.evaluate(processed);
      
      // Format result
      return this.formatResult(result);
    } catch (error) {
      throw new Error('Invalid expression');
    }
  }

  /**
   * Preprocess expression before evaluation
   * @param {string} expr - Raw expression
   * @returns {string} Processed expression
   */
  preprocessExpression(expr) {
    return expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt');
  }

  /**
   * Format result for display
   * @param {number} value - The value to format
   * @returns {string} Formatted string
   */
  formatResult(value) {
    // Handle very large/small numbers
    if (Math.abs(value) > 1e10 || (Math.abs(value) < 1e-6 && value !== 0)) {
      return value.toExponential(6);
    }
    
    // Round to 10 significant figures
    return parseFloat(value.toPrecision(10)).toString();
  }

  /**
   * Set angle mode (DEG or RAD)
   * @param {'DEG' | 'RAD'} mode
   */
  setAngleMode(mode) {
    this.angleMode = mode;
    this.configureAngleMode();
  }

  /**
   * Configure math.js for current angle mode
   */
  configureAngleMode() {
    if (this.angleMode === 'DEG') {
      // Configure for degrees
      this.math.config({
        angles: 'deg'
      });
    } else {
      // Configure for radians
      this.math.config({
        angles: 'rad'
      });
    }
  }
}
```

### 5.2 State Manager

**File**: `src/core/StateManager.js`

#### Responsibilities
- Manage application state
- Notify subscribers of state changes
- Persist state to localStorage
- Provide state access methods

#### Implementation

```javascript
class StateManager {
  constructor(initialState = {}) {
    this.state = {
      currentValue: '0',
      previousValue: '',
      operator: null,
      expression: '',
      history: [],
      angleMode: 'DEG',
      theme: 'dark',
      mode: 'calculator',
      isResultDisplayed: false,
      hasError: false,
      errorMessage: null,
      ...initialState
    };
    
    this.subscribers = new Set();
    this.loadFromStorage();
  }

  /**
   * Get current state
   * @returns {AppState}
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Update state
   * @param {Partial<AppState>} updates - State updates
   */
  setState(updates) {
    const prevState = this.state;
    this.state = { ...this.state, ...updates };
    
    // Notify subscribers
    this.notifySubscribers(prevState, this.state);
    
    // Persist to storage
    this.saveToStorage();
  }

  /**
   * Subscribe to state changes
   * @param {Function} callback - Called when state changes
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  /**
   * Notify all subscribers of state change
   */
  notifySubscribers(prevState, newState) {
    this.subscribers.forEach(callback => {
      callback(newState, prevState);
    });
  }

  /**
   * Save state to localStorage
   */
  saveToStorage() {
    const persistedState = {
      angleMode: this.state.angleMode,
      theme: this.state.theme,
      mode: this.state.mode,
      history: this.state.history.slice(-50) // Keep last 50
    };
    
    localStorage.setItem('calculator-state', JSON.stringify(persistedState));
  }

  /**
   * Load state from localStorage
   */
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('calculator-state');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.state = { ...this.state, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load state from storage:', error);
    }
  }

  /**
   * Reset calculator state (keep preferences)
   */
  reset() {
    this.setState({
      currentValue: '0',
      previousValue: '',
      operator: null,
      expression: '',
      isResultDisplayed: false,
      hasError: false,
      errorMessage: null
    });
  }
}
```

### 5.3 Expression Parser

**File**: `src/core/ExpressionParser.js`

#### Responsibilities
- Parse user input into valid expressions
- Handle implicit multiplication (e.g., "2π" → "2*π")
- Validate expression syntax
- Handle parentheses matching

#### Key Methods

```javascript
class ExpressionParser {
  /**
   * Parse and validate expression
   * @param {string} input - User input
   * @returns {string} Parsed expression
   * @throws {Error} If expression is invalid
   */
  parse(input) {
    // Remove whitespace
    let expr = input.trim();
    
    // Add implicit multiplication
    expr = this.addImplicitMultiplication(expr);
    
    // Validate parentheses
    if (!this.validateParentheses(expr)) {
      throw new Error('Mismatched parentheses');
    }
    
    return expr;
  }

  /**
   * Add implicit multiplication where needed
   * Examples: 2π → 2*π, 5(3+2) → 5*(3+2)
   */
  addImplicitMultiplication(expr) {
    return expr
      // Number before π
      .replace(/(\d)(π)/g, '$1*$2')
      // Number before (
      .replace(/(\d)\(/g, '$1*(')
      // ) before number
      .replace(/\)(\d)/g, ')*$1')
      // ) before (
      .replace(/\)\(/g, ')*(')
      // π before (
      .replace(/(π)\(/g, '$1*(');
  }

  /**
   * Validate parentheses matching
   */
  validateParentheses(expr) {
    let count = 0;
    for (const char of expr) {
      if (char === '(') count++;
      if (char === ')') count--;
      if (count < 0) return false;
    }
    return count === 0;
  }

  /**
   * Check if expression is complete
   */
  isComplete(expr) {
    // Check if ends with operator
    if (/[+\-×÷]$/.test(expr)) return false;
    
    // Check if has unclosed parentheses
    if (!this.validateParentheses(expr)) return false;
    
    return true;
  }
}
```

---

## 6. API Specifications

### 6.1 Calculator Engine API

```javascript
// Initialize calculator
const calculator = new CalculatorEngine('DEG');

// Evaluate expression
calculator.evaluate('sin(30) + 12');  // Returns: 12.5

// Set angle mode
calculator.setAngleMode('RAD');

// Format result
calculator.formatResult(3.14159265359);  // Returns: "3.141592654"
```

### 6.2 State Manager API

```javascript
// Initialize state manager
const stateManager = new StateManager();

// Get current state
const state = stateManager.getState();

// Update state
stateManager.setState({ currentValue: '42' });

// Subscribe to changes
const unsubscribe = stateManager.subscribe((newState, prevState) => {
  console.log('State changed:', newState);
});

// Reset calculator
stateManager.reset();

// Unsubscribe
unsubscribe();
```

### 6.3 Component API

```javascript
// Display Component
class Display {
  constructor(container, stateManager) {
    this.container = container;
    this.stateManager = stateManager;
    this.init();
  }

  init() {
    this.render();
    this.stateManager.subscribe((state) => this.update(state));
  }

  render() {
    // Create DOM elements
  }

  update(state) {
    // Update display with new state
  }
}
```

---

## 7. State Management

### 7.1 State Flow Diagram

```
┌─────────────┐
│ User Action │
└──────┬──────┘
       │
       ↓
┌─────────────────┐
│ Event Handler   │
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│ State Manager   │ ← Validates & Updates State
└──────┬──────────┘
       │
       ├─────────────────┐
       ↓                 ↓
┌─────────────┐   ┌──────────────┐
│ UI Update   │   │ LocalStorage │
└─────────────┘   └──────────────┘
```

### 7.2 State Update Examples

#### Number Input
```javascript
// User presses "5"
stateManager.setState({
  currentValue: state.currentValue === '0' 
    ? '5' 
    : state.currentValue + '5',
  expression: state.expression + '5'
});
```

#### Operator Input
```javascript
// User presses "+"
stateManager.setState({
  operator: '+',
  previousValue: state.currentValue,
  currentValue: '0',
  expression: state.expression + ' + '
});
```

#### Equals
```javascript
// User presses "="
try {
  const result = calculator.evaluate(state.expression);
  stateManager.setState({
    currentValue: result,
    previousValue: state.expression,
    expression: result,
    isResultDisplayed: true,
    history: [
      ...state.history,
      {
        id: Date.now().toString(),
        expression: state.expression,
        result: result,
        timestamp: Date.now(),
        angleMode: state.angleMode
      }
    ]
  });
} catch (error) {
  stateManager.setState({
    hasError: true,
    errorMessage: 'Error',
    currentValue: 'Error'
  });
}
```

---

## 8. UI Component Library

### 8.1 Component Hierarchy

```
App
├── Header
│   ├── MenuButton
│   ├── Title
│   └── AngleModeToggle
├── ModeSwitch
│   ├── CalculatorTab
│   └── ConverterTab
├── Display
│   ├── HistoryLine
│   └── MainResult
├── FunctionChips
│   └── FunctionButton[]
└── Keypad
    └── Button[]
```

### 8.2 Component Specifications

#### Display Component

**File**: `src/components/Display.js`

```javascript
class Display {
  constructor(container, stateManager) {
    this.container = container;
    this.stateManager = stateManager;
    this.elements = {};
    this.init();
  }

  init() {
    this.render();
    this.stateManager.subscribe((state) => this.update(state));
  }

  render() {
    this.container.innerHTML = `
      <div class="flex flex-col items-end justify-end px-6 py-6 grow">
        <p class="history-line text-slate-400 dark:text-slate-500 text-lg font-medium leading-normal mb-1 opacity-80"></p>
        <div class="relative w-full text-right group">
          <h1 class="main-result text-slate-800 dark:text-white text-6xl font-bold leading-none tracking-tight break-all">
            0<span class="text-primary animate-pulse">|</span>
          </h1>
        </div>
      </div>
    `;
    
    this.elements.history = this.container.querySelector('.history-line');
    this.elements.result = this.container.querySelector('.main-result');
  }

  update(state) {
    // Update history line
    if (state.previousValue) {
      this.elements.history.textContent = state.previousValue;
    } else {
      this.elements.history.textContent = '';
    }
    
    // Update main result
    const cursor = '<span class="text-primary animate-pulse">|</span>';
    if (state.hasError) {
      this.elements.result.innerHTML = `<span class="text-red-500">${state.errorMessage}</span>`;
    } else {
      this.elements.result.innerHTML = state.currentValue + cursor;
    }
  }
}
```

#### Keypad Component

**File**: `src/components/Keypad.js`

```javascript
class Keypad {
  constructor(container, stateManager, calculator) {
    this.container = container;
    this.stateManager = stateManager;
    this.calculator = calculator;
    this.buttons = this.getButtonConfig();
    this.init();
  }

  getButtonConfig() {
    return [
      // Row 1
      { id: 'ac', label: 'AC', type: 'control', action: 'clear' },
      { id: 'backspace', label: '⌫', type: 'control', action: 'backspace' },
      { id: 'percent', label: '%', value: '%', type: 'operator' },
      { id: 'divide', label: '÷', value: '÷', type: 'operator' },
      
      // Row 2
      { id: '7', label: '7', value: '7', type: 'number' },
      { id: '8', label: '8', value: '8', type: 'number' },
      { id: '9', label: '9', value: '9', type: 'number' },
      { id: 'multiply', label: '×', value: '×', type: 'operator' },
      
      // Row 3
      { id: '4', label: '4', value: '4', type: 'number' },
      { id: '5', label: '5', value: '5', type: 'number' },
      { id: '6', label: '6', value: '6', type: 'number' },
      { id: 'subtract', label: '-', value: '-', type: 'operator' },
      
      // Row 4
      { id: '1', label: '1', value: '1', type: 'number' },
      { id: '2', label: '2', value: '2', type: 'number' },
      { id: '3', label: '3', value: '3', type: 'number' },
      { id: 'add', label: '+', value: '+', type: 'operator' },
      
      // Row 5
      { id: '0', label: '0', value: '0', type: 'number' },
      { id: 'decimal', label: '.', value: '.', type: 'number' },
      { id: 'equals', label: '=', type: 'control', action: 'equals', gridColumn: 2 }
    ];
  }

  render() {
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-4 gap-3 h-full';
    
    this.buttons.forEach(button => {
      const btn = this.createButton(button);
      grid.appendChild(btn);
    });
    
    this.container.appendChild(grid);
  }

  createButton(config) {
    const button = document.createElement('button');
    button.id = config.id;
    button.textContent = config.label;
    button.className = this.getButtonClass(config);
    
    if (config.gridColumn) {
      button.style.gridColumn = `span ${config.gridColumn}`;
    }
    
    button.addEventListener('click', () => this.handleButtonClick(config));
    
    return button;
  }

  getButtonClass(config) {
    const baseClass = 'h-16 rounded-2xl font-medium hover:opacity-80 active:scale-95 transition-all';
    
    switch (config.type) {
      case 'number':
        return `${baseClass} bg-slate-50 dark:bg-[#1a202c] text-slate-900 dark:text-white text-2xl`;
      case 'operator':
        return `${baseClass} bg-primary/10 dark:bg-primary/20 text-primary text-2xl font-bold`;
      case 'control':
        if (config.id === 'equals') {
          return `${baseClass} bg-primary text-white text-3xl font-bold shadow-lg shadow-primary/30`;
        }
        return `${baseClass} bg-slate-100 dark:bg-surface-dark text-slate-900 dark:text-white text-lg`;
      default:
        return baseClass;
    }
  }

  handleButtonClick(config) {
    const state = this.stateManager.getState();
    
    if (config.action) {
      this.handleAction(config.action);
    } else if (config.value) {
      this.handleInput(config.value);
    }
  }

  handleAction(action) {
    switch (action) {
      case 'clear':
        this.stateManager.reset();
        break;
      case 'backspace':
        this.handleBackspace();
        break;
      case 'equals':
        this.handleEquals();
        break;
    }
  }

  handleInput(value) {
    const state = this.stateManager.getState();
    
    // If showing result, start new calculation
    if (state.isResultDisplayed) {
      this.stateManager.setState({
        currentValue: value,
        expression: value,
        isResultDisplayed: false
      });
      return;
    }
    
    // Append to current value
    const newValue = state.currentValue === '0' ? value : state.currentValue + value;
    this.stateManager.setState({
      currentValue: newValue,
      expression: state.expression + value
    });
  }

  handleBackspace() {
    const state = this.stateManager.getState();
    if (state.currentValue.length > 1) {
      this.stateManager.setState({
        currentValue: state.currentValue.slice(0, -1),
        expression: state.expression.slice(0, -1)
      });
    } else {
      this.stateManager.setState({
        currentValue: '0',
        expression: ''
      });
    }
  }

  handleEquals() {
    const state = this.stateManager.getState();
    
    try {
      const result = this.calculator.evaluate(state.expression);
      this.stateManager.setState({
        currentValue: result,
        previousValue: state.expression,
        expression: result,
        isResultDisplayed: true,
        hasError: false,
        history: [
          ...state.history,
          {
            id: Date.now().toString(),
            expression: state.expression,
            result: result,
            timestamp: Date.now(),
            angleMode: state.angleMode
          }
        ]
      });
    } catch (error) {
      this.stateManager.setState({
        hasError: true,
        errorMessage: 'Error',
        currentValue: 'Error'
      });
    }
  }
}
```

---

## 9. Calculation Engine

### 9.1 Math.js Configuration

```javascript
import { create, all } from 'mathjs';

const math = create(all);

// Configure precision
math.config({
  number: 'BigNumber',
  precision: 64
});

// Configure angle mode
math.config({
  angles: 'deg'  // or 'rad'
});
```

### 9.2 Supported Functions

#### Basic Operations
- `+` Addition
- `-` Subtraction
- `×` Multiplication
- `÷` Division
- `%` Modulo/Percentage

#### Trigonometric
- `sin(x)` Sine
- `cos(x)` Cosine
- `tan(x)` Tangent
- `asin(x)` Arc sine
- `acos(x)` Arc cosine
- `atan(x)` Arc tangent

#### Logarithmic
- `log(x)` Base-10 logarithm
- `ln(x)` Natural logarithm
- `log(x, base)` Logarithm with custom base

#### Algebraic
- `sqrt(x)` Square root
- `x^y` Power
- `abs(x)` Absolute value
- `factorial(x)` Factorial

#### Constants
- `pi` or `π` Pi (3.14159...)
- `e` Euler's number (2.71828...)

### 9.3 Error Handling

```javascript
class CalculatorError extends Error {
  constructor(message, type) {
    super(message);
    this.name = 'CalculatorError';
    this.type = type;
  }
}

// Error types
const ErrorTypes = {
  SYNTAX_ERROR: 'syntax',
  MATH_ERROR: 'math',
  OVERFLOW: 'overflow'
};

// Handle errors
try {
  const result = calculator.evaluate(expression);
} catch (error) {
  if (error.message.includes('division by zero')) {
    throw new CalculatorError('Cannot divide by zero', ErrorTypes.MATH_ERROR);
  } else if (error.message.includes('Unexpected')) {
    throw new CalculatorError('Invalid expression', ErrorTypes.SYNTAX_ERROR);
  } else {
    throw new CalculatorError('Calculation error', ErrorTypes.MATH_ERROR);
  }
}
```

---

## 10. Testing Strategy

### 10.1 Unit Tests (Vitest)

**Location**: `tests/unit/`

#### Calculator Engine Tests
```javascript
// tests/unit/CalculatorEngine.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { CalculatorEngine } from '../../src/core/CalculatorEngine';

describe('CalculatorEngine', () => {
  let calculator;

  beforeEach(() => {
    calculator = new CalculatorEngine('DEG');
  });

  describe('Basic Operations', () => {
    it('should add two numbers', () => {
      expect(calculator.evaluate('2 + 3')).toBe('5');
    });

    it('should subtract two numbers', () => {
      expect(calculator.evaluate('10 - 4')).toBe('6');
    });

    it('should multiply two numbers', () => {
      expect(calculator.evaluate('5 × 3')).toBe('15');
    });

    it('should divide two numbers', () => {
      expect(calculator.evaluate('20 ÷ 4')).toBe('5');
    });
  });

  describe('Order of Operations', () => {
    it('should follow PEMDAS', () => {
      expect(calculator.evaluate('2 + 3 × 4')).toBe('14');
    });

    it('should handle parentheses', () => {
      expect(calculator.evaluate('(2 + 3) × 4')).toBe('20');
    });
  });

  describe('Trigonometric Functions', () => {
    it('should calculate sin in degrees', () => {
      expect(calculator.evaluate('sin(30)')).toBe('0.5');
    });

    it('should calculate cos in degrees', () => {
      expect(calculator.evaluate('cos(60)')).toBe('0.5');
    });

    it('should calculate tan in radians', () => {
      calculator.setAngleMode('RAD');
      expect(calculator.evaluate('tan(0)')).toBe('0');
    });
  });

  describe('Error Handling', () => {
    it('should throw error for division by zero', () => {
      expect(() => calculator.evaluate('1 ÷ 0')).toThrow();
    });

    it('should throw error for invalid expression', () => {
      expect(() => calculator.evaluate('2 + + 3')).toThrow();
    });
  });
});
```

#### State Manager Tests
```javascript
// tests/unit/StateManager.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StateManager } from '../../src/core/StateManager';

describe('StateManager', () => {
  let stateManager;

  beforeEach(() => {
    localStorage.clear();
    stateManager = new StateManager();
  });

  it('should initialize with default state', () => {
    const state = stateManager.getState();
    expect(state.currentValue).toBe('0');
    expect(state.angleMode).toBe('DEG');
  });

  it('should update state', () => {
    stateManager.setState({ currentValue: '42' });
    expect(stateManager.getState().currentValue).toBe('42');
  });

  it('should notify subscribers on state change', () => {
    const callback = vi.fn();
    stateManager.subscribe(callback);
    
    stateManager.setState({ currentValue: '5' });
    
    expect(callback).toHaveBeenCalled();
  });

  it('should persist state to localStorage', () => {
    stateManager.setState({ angleMode: 'RAD' });
    
    const stored = JSON.parse(localStorage.getItem('calculator-state'));
    expect(stored.angleMode).toBe('RAD');
  });

  it('should load state from localStorage', () => {
    localStorage.setItem('calculator-state', JSON.stringify({
      angleMode: 'RAD',
      theme: 'light'
    }));
    
    const newManager = new StateManager();
    expect(newManager.getState().angleMode).toBe('RAD');
    expect(newManager.getState().theme).toBe('light');
  });
});
```

### 10.2 Integration Tests

**Location**: `tests/integration/`

```javascript
// tests/integration/calculator-flow.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from '../../src/app';

describe('Calculator Flow', () => {
  let app;
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    app = new App(container);
  });

  it('should perform basic calculation', () => {
    // Simulate button clicks
    app.handleInput('2');
    app.handleInput('+');
    app.handleInput('3');
    app.handleInput('=');
    
    const state = app.stateManager.getState();
    expect(state.currentValue).toBe('5');
  });

  it('should clear calculator', () => {
    app.handleInput('5');
    app.handleAction('clear');
    
    const state = app.stateManager.getState();
    expect(state.currentValue).toBe('0');
  });

  it('should handle backspace', () => {
    app.handleInput('1');
    app.handleInput('2');
    app.handleInput('3');
    app.handleAction('backspace');
    
    const state = app.stateManager.getState();
    expect(state.currentValue).toBe('12');
  });
});
```

### 10.3 E2E Tests (Playwright)

**Location**: `tests/e2e/`

```javascript
// tests/e2e/calculator.spec.js
import { test, expect } from '@playwright/test';

test.describe('Engineering Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should load calculator interface', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('ENGINEERING');
    await expect(page.locator('.main-result')).toBeVisible();
  });

  test('should perform basic calculation', async ({ page }) => {
    await page.click('button:has-text("2")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    
    await expect(page.locator('.main-result')).toContainText('5');
  });

  test('should toggle angle mode', async ({ page }) => {
    const toggle = page.locator('button:has-text("DEG")');
    await expect(toggle).toBeVisible();
    
    await toggle.click();
    await expect(toggle).toHaveText('RAD');
  });

  test('should switch to converter mode', async ({ page }) => {
    await page.click('label:has-text("Converter")');
    await expect(page.locator('.converter-interface')).toBeVisible();
  });

  test('should handle error gracefully', async ({ page }) => {
    await page.click('button:has-text("1")');
    await page.click('button:has-text("÷")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("=")');
    
    await expect(page.locator('.main-result')).toContainText('Error');
  });
});
```

### 10.4 Test Coverage Goals

- **Unit Tests**: 90%+ coverage
- **Integration Tests**: All critical user flows
- **E2E Tests**: All major features

### 10.5 Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

---

## 11. Build & Deployment

### 11.1 Development Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 11.2 Vite Configuration

**File**: `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'mathjs': ['mathjs']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@core': path.resolve(__dirname, './src/core'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  server: {
    port: 5173,
    open: true,
    cors: true
  },
  preview: {
    port: 4173
  }
});
```

### 11.3 Tailwind Configuration

**File**: `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#135bec',
        'background-light': '#f6f6f8',
        'background-dark': '#101622',
        'surface-dark': '#1e2430',
        'surface-light': '#ffffff',
        'keypad-dark': '#151a23',
        'number-btn-dark': '#1a202c',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
```

### 11.4 Package.json Scripts

```json
{
  "name": "engineering-calculator",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:unit": "vitest run --dir tests/unit",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src --ext .js",
    "format": "prettier --write \"src/**/*.{js,css,html}\""
  }
}
```

### 11.5 Deployment

#### Static Hosting (Vercel/Netlify)

```bash
# Build production bundle
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### GitHub Pages

```bash
# Build with base path
vite build --base=/engineering-calculator/

# Deploy
npm run deploy
```

---

## 12. Performance Optimization

### 12.1 Code Splitting

```javascript
// Lazy load converter module
const loadConverter = async () => {
  const { ConverterEngine } = await import('./core/ConverterEngine.js');
  return new ConverterEngine();
};
```

### 12.2 Bundle Optimization

- **Tree Shaking**: Remove unused code
- **Minification**: Compress JavaScript and CSS
- **Code Splitting**: Separate vendor and app code
- **Asset Optimization**: Compress images and fonts

### 12.3 Runtime Optimization

```javascript
// Debounce rapid button presses
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Memoize calculation results
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};
```

### 12.4 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Total Bundle Size**: < 200KB (gzipped)
- **Lighthouse Score**: 90+

---

## 13. Security Considerations

### 13.1 Input Validation

```javascript
// Sanitize user input
const sanitizeInput = (input) => {
  // Remove potentially dangerous characters
  return input.replace(/[^0-9+\-×÷().\s]/g, '');
};

// Validate expression before evaluation
const validateExpression = (expr) => {
  // Check for injection attempts
  const dangerous = /<script|javascript:|onerror|onclick/i;
  if (dangerous.test(expr)) {
    throw new Error('Invalid expression');
  }
  return true;
};
```

### 13.2 Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com;">
```

### 13.3 Data Privacy

- **No External Requests**: All calculations performed client-side
- **LocalStorage Only**: No server-side data storage
- **No Analytics**: No tracking or telemetry (unless explicitly added)

---

## 14. Development Guidelines

### 14.1 Code Style

#### JavaScript Style Guide

```javascript
// Use const/let, not var
const PI = 3.14159;
let result = 0;

// Use arrow functions
const add = (a, b) => a + b;

// Use template literals
const message = `Result: ${result}`;

// Use destructuring
const { currentValue, operator } = state;

// Use async/await
const calculate = async (expr) => {
  try {
    const result = await evaluateExpression(expr);
    return result;
  } catch (error) {
    console.error(error);
  }
};
```

#### ESLint Configuration

```json
{
  "extends": ["eslint:recommended"],
  "env": {
    "browser": true,
    "es2021": true
  },
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### 14.2 Git Workflow

```bash
# Feature branch workflow
git checkout -b feature/add-converter-mode
git commit -m "feat: add converter mode UI"
git push origin feature/add-converter-mode

# Commit message format
# <type>: <description>
# Types: feat, fix, docs, style, refactor, test, chore
```

### 14.3 Documentation

- **JSDoc Comments**: Document all public methods
- **README**: Setup and usage instructions
- **CHANGELOG**: Track version changes
- **API Docs**: Auto-generate from JSDoc

```javascript
/**
 * Evaluate a mathematical expression
 * @param {string} expression - The expression to evaluate
 * @param {Object} options - Evaluation options
 * @param {'DEG'|'RAD'} options.angleMode - Angle mode for trig functions
 * @returns {string} The calculated result
 * @throws {CalculatorError} If expression is invalid
 * @example
 * calculator.evaluate('sin(30)', { angleMode: 'DEG' })
 * // Returns: "0.5"
 */
evaluate(expression, options = {}) {
  // Implementation
}
```

### 14.4 Code Review Checklist

- [ ] Code follows style guide
- [ ] All tests pass
- [ ] No console.log statements
- [ ] Error handling implemented
- [ ] Performance considered
- [ ] Accessibility checked
- [ ] Documentation updated

---

## Appendix A: File Structure

```
engineering-calculator/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── README.md
├── CHANGELOG.md
├── src/
│   ├── main.js
│   ├── app.js
│   ├── components/
│   │   ├── Display.js
│   │   ├── Keypad.js
│   │   ├── FunctionChips.js
│   │   ├── Header.js
│   │   ├── ModeSwitch.js
│   │   └── AngleModeToggle.js
│   ├── core/
│   │   ├── CalculatorEngine.js
│   │   ├── ConverterEngine.js
│   │   ├── ExpressionParser.js
│   │   └── StateManager.js
│   ├── utils/
│   │   ├── formatter.js
│   │   ├── validator.js
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── storage/
│   │   ├── LocalStorageManager.js
│   │   ├── HistoryStore.js
│   │   └── PreferencesStore.js
│   └── styles/
│       ├── main.css
│       └── components/
│           ├── display.css
│           ├── keypad.css
│           └── chips.css
├── tests/
│   ├── unit/
│   │   ├── CalculatorEngine.test.js
│   │   ├── StateManager.test.js
│   │   ├── ExpressionParser.test.js
│   │   └── formatter.test.js
│   ├── integration/
│   │   ├── calculator-flow.test.js
│   │   └── converter-flow.test.js
│   └── e2e/
│       ├── calculator.spec.js
│       └── converter.spec.js
├── public/
│   ├── favicon.ico
│   └── manifest.json
└── dist/                 # Build output (generated)
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js
    │   └── index-[hash].css
    └── favicon.ico
```

---

## Appendix B: Browser Compatibility Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| ES6+ | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |
| CSS Grid | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |
| Flexbox | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |
| LocalStorage | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |
| CSS Variables | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |
| Dark Mode | ✅ 90+ | ✅ 88+ | ✅ 14+ | ✅ 90+ |

---

## Appendix C: Performance Budget

| Metric | Target | Maximum |
|--------|--------|---------|
| Total Bundle Size | 150KB | 200KB |
| JavaScript | 100KB | 150KB |
| CSS | 30KB | 50KB |
| First Contentful Paint | 1.0s | 1.5s |
| Time to Interactive | 2.0s | 3.0s |
| Lighthouse Performance | 95 | 90 |

---

## Appendix D: Glossary

- **SPA**: Single Page Application
- **CDN**: Content Delivery Network
- **E2E**: End-to-End (testing)
- **CSP**: Content Security Policy
- **PEMDAS**: Order of operations (Parentheses, Exponents, Multiplication, Division, Addition, Subtraction)
- **Memoization**: Caching function results for performance

---

**Document Status**: Ready for Implementation  
**Next Steps**: Begin Phase 1 development (MVP)  
**Estimated Timeline**: 4-6 weeks for MVP
