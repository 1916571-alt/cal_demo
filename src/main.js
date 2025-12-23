/**
 * Engineering Calculator - Main Application
 * 
 * Integrates all components and core logic
 */

import './style.css';

// Import components
import { Display } from './components/Display.js';
import { Keypad } from './components/Keypad.js';
import { FunctionChips } from './components/FunctionChips.js';
import { Header } from './components/Header.js';
import { ModeSwitch } from './components/ModeSwitch.js';

// Import core logic
import { ExpressionParser } from './core/ExpressionParser.js';
import { CalculatorEngine } from './core/CalculatorEngine.js';
import { StateManager } from './core/StateManager.js';

class CalculatorApp {
  constructor() {
    // Initialize core logic
    this.parser = new ExpressionParser();
    this.calculator = new CalculatorEngine();
    this.stateManager = new StateManager();

    // Initialize components
    this.initializeComponents();

    // Subscribe to state changes
    this.subscribeToState();

    // Setup keyboard support
    this.setupKeyboardSupport();

    // Initialize from saved state
    this.initializeFromState();
  }

  initializeComponents() {
    const app = document.getElementById('app');

    // Create container structure
    app.innerHTML = `
            <div class="calculator-container">
                <div id="header"></div>
                <div id="mode-switch"></div>
                <div id="display"></div>
                <div id="function-chips"></div>
                <div id="keypad"></div>
            </div>
        `;

    // Initialize components
    this.header = new Header(
      document.getElementById('header'),
      (mode) => this.handleAngleModeChange(mode)
    );

    this.modeSwitch = new ModeSwitch(
      document.getElementById('mode-switch'),
      (mode) => this.handleModeChange(mode)
    );

    this.display = new Display(document.getElementById('display'));

    this.functionChips = new FunctionChips(
      document.getElementById('function-chips'),
      (value) => this.handleInput(value)
    );

    this.keypad = new Keypad(
      document.getElementById('keypad'),
      (value) => this.handleButtonClick(value)
    );
  }

  subscribeToState() {
    this.stateManager.subscribe((state) => {
      // Update display
      this.display.update(
        state.currentValue || '0',
        state.previousEquation
      );

      // Update angle mode
      this.header.setAngleMode(state.angleMode);
      this.calculator.setAngleMode(state.angleMode);

      // Update theme
      this.updateTheme(state.theme);

      // Update mode
      this.modeSwitch.setMode(state.mode);
    });
  }

  initializeFromState() {
    const state = this.stateManager.getState();
    this.display.update(state.currentValue || '0', state.previousEquation);
    this.header.setAngleMode(state.angleMode);
    this.calculator.setAngleMode(state.angleMode);
    this.updateTheme(state.theme);
  }

  handleButtonClick(value) {
    switch (value) {
      case 'clear':
        this.handleClear();
        break;
      case 'backspace':
        this.handleBackspace();
        break;
      case 'equals':
        this.handleEquals();
        break;
      default:
        this.handleInput(value);
    }
  }

  handleInput(value) {
    const state = this.stateManager.getState();
    let currentValue = state.currentValue || '';

    // Append the value
    currentValue += value;

    // Update state
    this.stateManager.updateState({ currentValue });
  }

  handleClear() {
    this.stateManager.resetCalculation();
  }

  handleBackspace() {
    const state = this.stateManager.getState();
    let currentValue = state.currentValue || '';

    if (currentValue.length > 0) {
      currentValue = currentValue.slice(0, -1);
      this.stateManager.updateState({ currentValue });
    }
  }

  handleEquals() {
    const state = this.stateManager.getState();
    const expression = state.currentValue;

    if (!expression) return;

    try {
      // Parse the expression
      const parsed = this.parser.parse(expression);

      // Evaluate
      const result = this.calculator.evaluateAndFormat(parsed);

      // Update state
      this.stateManager.updateState({
        previousEquation: expression,
        currentValue: result
      });

      // Add to history
      this.stateManager.addToHistory(expression, result);

    } catch (error) {
      // Show error
      this.display.update('Error', expression, true);

      // Reset after 2 seconds
      setTimeout(() => {
        this.stateManager.resetCalculation();
      }, 2000);
    }
  }

  handleAngleModeChange(mode) {
    this.stateManager.updateState({ angleMode: mode });
  }

  handleModeChange(mode) {
    this.stateManager.updateState({ mode });

    // TODO: Show/hide converter UI when implemented
    if (mode === 'converter') {
      console.log('Converter mode - to be implemented in Phase 3');
    }
  }

  updateTheme(theme) {
    document.body.className = theme;
  }

  setupKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
      // Prevent default for calculator keys
      const calculatorKeys = ['Enter', 'Escape', 'Backspace', '+', '-', '*', '/', '%'];
      if (calculatorKeys.includes(e.key) || /^[0-9.]$/.test(e.key)) {
        e.preventDefault();
      }

      // Number keys
      if (/^[0-9.]$/.test(e.key)) {
        this.handleInput(e.key);
      }

      // Operators
      switch (e.key) {
        case '+':
          this.handleInput('+');
          break;
        case '-':
          this.handleInput('-');
          break;
        case '*':
          this.handleInput('×');
          break;
        case '/':
          this.handleInput('÷');
          break;
        case '%':
          this.handleInput('%');
          break;
        case 'Enter':
          this.handleEquals();
          break;
        case 'Escape':
          this.handleClear();
          break;
        case 'Backspace':
          this.handleBackspace();
          break;
        case '(':
          this.handleInput('(');
          break;
        case ')':
          this.handleInput(')');
          break;
      }

      // Function shortcuts
      if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
        this.handleInput('sin(');
      } else if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {
        this.handleInput('cos(');
      } else if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey) {
        this.handleInput('tan(');
      } else if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.metaKey) {
        this.handleInput('π');
      }
    });
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CalculatorApp();
});
