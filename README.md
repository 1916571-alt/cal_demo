# Engineering Calculator

A modern, feature-rich engineering calculator built with TDD and SOLID principles.

## 🎯 Project Overview

This project implements a scientific calculator with advanced mathematical functions, following strict development practices:

- **Test-Driven Development (TDD)**: All core logic developed test-first
- **SOLID Principles**: Clean, maintainable, and extensible architecture
- **Modern Stack**: Vite + Vanilla JS + Tailwind CSS + math.js

## 📋 Documentation

- **[PRD.md](./PRD.md)**: Product Requirements Document
- **[TECH_SPEC.md](./TECH_SPEC.md)**: Technical Specification
- **[DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md)**: Development Guidelines (TDD & SOLID)

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone repository
git clone https://github.com/1916571-alt/cal_demo.git
cd cal_demo

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Workflow

```bash
# Start test watcher (for TDD)
npm run test:watch

# Run all tests
npm test

# Check test coverage
npm run test:coverage

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

This project follows **Test-Driven Development (TDD)**:

1. Write a failing test (RED)
2. Write minimal code to pass (GREEN)
3. Refactor while keeping tests green (REFACTOR)

### Test Commands

```bash
# Run tests once
npm test

# Watch mode (recommended for TDD)
npm run test:watch

# Coverage report
npm run test:coverage

# Visual test UI
npm run test:ui
```

### Coverage Requirements

- **Core Logic**: 90%+ coverage required
- **UI Components**: Not required for coverage

## 🏗️ Architecture

### SOLID Principles

All code follows SOLID principles:

- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

See [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md) for detailed guidelines.

### Project Structure

```
cal_demo/
├── src/
│   ├── main.js              # Application entry point
│   ├── app.js               # Main application controller
│   ├── components/          # UI Components (not TDD required)
│   ├── core/                # Business Logic (TDD required)
│   │   ├── CalculatorEngine.js
│   │   ├── ExpressionParser.js
│   │   └── StateManager.js
│   ├── utils/               # Utilities (TDD required)
│   └── storage/             # Data persistence (TDD required)
├── tests/
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   └── e2e/                 # End-to-end tests
├── PRD.md                   # Product requirements
├── TECH_SPEC.md             # Technical specification
└── DEVELOPMENT_RULES.md     # Development guidelines
```

## 🎨 Features

- ✅ Basic arithmetic operations (+, -, ×, ÷)
- ✅ Advanced functions (sin, cos, tan, log, ln, sqrt, power)
- ✅ Angle mode switching (DEG/RAD)
- ✅ Dark/Light theme support
- ✅ Calculation history
- ✅ Unit converter mode
- ✅ Responsive design

## 🔧 Tech Stack

- **Build Tool**: Vite 5.x
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS 3.x
- **Math Library**: math.js 12.x
- **Testing**: Vitest 1.x
- **CI/CD**: GitHub Actions
- **Deployment**: GitHub Pages

## 📦 Deployment

The project is automatically deployed to GitHub Pages via GitHub Actions.

### Manual Deployment

```bash
# Build production bundle
npm run build

# Deploy (automatic via GitHub Actions on push to main)
git push origin main
```

### Live Demo

🔗 [https://1916571-alt.github.io/cal_demo/](https://1916571-alt.github.io/cal_demo/)

## 🤝 Contributing

### Development Rules

1. **TDD Required**: All core logic must be developed using TDD
2. **SOLID Principles**: All code must follow SOLID principles
3. **Test Coverage**: Maintain 90%+ coverage for core logic
4. **Code Review**: All changes must pass code review checklist

See [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md) for complete guidelines.

### Commit Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
test: Add or update tests
refactor: Refactor code
style: Format code
chore: Update build scripts
```

## 📝 License

This project is for educational purposes.

## 👥 Author

- GitHub: [@1916571-alt](https://github.com/1916571-alt)

---

**Built with TDD & SOLID principles** 🧪⚡
