# Product Requirements Document (PRD)
## Engineering Calculator

---

## 1. Product Overview

### 1.1 Product Vision
Create a modern, feature-rich engineering calculator web application that combines powerful mathematical capabilities with an intuitive, visually stunning interface. The calculator will serve students, engineers, and professionals who need advanced mathematical functions in a beautiful, accessible package.

### 1.2 Target Audience
- **Primary**: Engineering students and professionals
- **Secondary**: Scientists, mathematicians, and technical users
- **Tertiary**: General users needing advanced calculations

### 1.3 Key Value Propositions
- **Premium Design**: Modern, dark-mode-first interface with smooth animations
- **Advanced Functions**: Full suite of engineering and scientific functions
- **Dual Modes**: Calculator and Converter functionality in one app
- **Responsive**: Works seamlessly across desktop and mobile devices
- **Accessibility**: Clean, readable interface with proper contrast ratios

---

## 2. Design System & Visual Specifications

### 2.1 Color Palette

#### Primary Colors
- **Primary Blue**: `#135bec` - Used for accents, operators, and interactive elements
- **Background Light**: `#f6f6f8` - Light mode background
- **Background Dark**: `#101622` - Dark mode background
- **Surface Dark**: `#1e2430` - Dark mode elevated surfaces
- **Surface Light**: `#ffffff` - Light mode elevated surfaces

#### Semantic Colors
- **Text Primary (Light)**: `#0f172a` (slate-900)
- **Text Primary (Dark)**: `#ffffff`
- **Text Secondary (Light)**: `#64748b` (slate-500)
- **Text Secondary (Dark)**: `#94a3b8` (slate-400)

### 2.2 Typography

#### Font Families
- **Display Font**: Space Grotesk (300, 400, 500, 600, 700)
  - Used for: Headers, buttons, main UI elements
- **Body Font**: Noto Sans (400, 500, 700)
  - Used for: Body text, secondary content

#### Type Scale
- **Display (Result)**: 60px (3.75rem), bold, tracking-tight
- **Equation History**: 18px (1.125rem), medium
- **Button Text**: 24px (1.5rem) for numbers, 18px for operators
- **Header**: 14px (0.875rem), semibold, uppercase, tracking-wider
- **Function Chips**: 14px (0.875rem), medium

### 2.3 Spacing & Layout

#### Border Radius
- **Default**: 4px (0.25rem)
- **Large**: 8px (0.5rem)
- **XL**: 12px (0.75rem)
- **2XL**: 16px (1rem)
- **Full**: 9999px (circular)

#### Component Spacing
- **Container Max Width**: 448px (28rem) - Mobile-first design
- **Padding**: 16px (1rem) standard, 24px (1.5rem) for display area
- **Gap**: 12px (0.75rem) for grid, 8px (0.5rem) for chips

### 2.4 Elevation & Shadows
- **App Container**: `shadow-2xl` - Deep shadow for main container
- **Keypad Surface**: `0 -4px 20px rgba(0,0,0,0.05)` (light), `0 -4px 20px rgba(0,0,0,0.2)` (dark)
- **Equals Button**: `shadow-lg shadow-primary/30` - Prominent glow effect

---

## 3. Feature Requirements

### 3.1 Core Calculator Features

#### 3.1.1 Basic Operations
- **Arithmetic**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Decimal Support**: Floating-point calculations with precision
- **Percentage**: Percentage calculations (%)
- **Clear Functions**: 
  - AC (All Clear) - Reset calculator
  - Backspace - Delete last character

#### 3.1.2 Advanced Mathematical Functions

**Trigonometric Functions**
- `sin` - Sine
- `cos` - Cosine
- `tan` - Tangent
- Support for both DEG (degrees) and RAD (radians) modes

**Logarithmic Functions**
- `log` - Base-10 logarithm
- `ln` - Natural logarithm (base-e)

**Algebraic Functions**
- `^` - Power/Exponentiation
- `√` - Square root
- `()` - Parentheses for order of operations

**Constants**
- `π` (Pi) - 3.14159...
- Additional constants (e, φ) can be added

#### 3.1.3 Display Features
- **Main Display**: Shows current result with up to 7 significant digits
- **History Display**: Shows previous equation/operation
- **Cursor**: Animated blinking cursor (`|`) in primary color
- **Real-time Updates**: Display updates as user types
- **Error Handling**: Display "Error" for invalid operations

### 3.2 Mode Switching

#### 3.2.1 Calculator Mode (Default)
- Full scientific calculator functionality
- Advanced function chips visible
- Standard keypad layout

#### 3.2.2 Converter Mode
- Unit conversion functionality
- Categories: Length, Weight, Temperature, Volume, Area, Speed, etc.
- Input/Output selection
- Real-time conversion

### 3.3 Settings & Preferences

#### 3.3.1 Angle Mode Toggle
- **DEG** (Degrees) - Default
- **RAD** (Radians)
- Toggle button in top-right header
- Persistent across sessions

#### 3.3.2 Theme Support
- **Dark Mode** (Default) - Optimized for low-light environments
- **Light Mode** - High contrast for bright environments
- Auto-detection based on system preferences
- Manual toggle via menu

---

## 4. User Interface Components

### 4.1 Header Bar
**Layout**: Horizontal flex container with space-between
**Components**:
- **Menu Button** (Left): Hamburger icon, opens navigation drawer
- **Title** (Center): "ENGINEERING" in uppercase, tracking-wider
- **Angle Mode Toggle** (Right): DEG/RAD pill button

**Styling**:
- Height: 48px
- Padding: 12px 16px
- Background: Transparent
- Icons: Material Symbols Outlined

### 4.2 Mode Switcher (Segmented Control)
**Layout**: Two-segment toggle
**Options**: Calculator | Converter
**Behavior**:
- Radio button group
- Smooth transition animation (200ms)
- Selected state: White background (light), dark background (dark)
- Selected text: Primary blue color

**Styling**:
- Height: 48px
- Border radius: 12px
- Background: slate-200 (light), surface-dark (dark)
- Inner padding: 4px

### 4.3 Display Area
**Layout**: Flex column, right-aligned
**Components**:
1. **History Line**: Previous equation (e.g., "sin(45) + 12")
   - Font size: 18px
   - Color: slate-400/500 (muted)
   - Opacity: 80%

2. **Main Result**: Current value/input
   - Font size: 60px, bold
   - Color: slate-800 (light), white (dark)
   - Animated cursor at end
   - Break-all for long numbers

**Styling**:
- Padding: 24px
- Flex-grow to fill available space
- Minimum height to prevent layout shift

### 4.4 Function Chips (Horizontal Scroll)
**Layout**: Horizontal scrollable row
**Functions**: sin, cos, tan, log, ln, (, ), ^, √, π
**Behavior**:
- Horizontal scroll (hidden scrollbar)
- Touch/swipe enabled
- Active scale animation (scale-95)
- Hover state

**Styling**:
- Height: 40px
- Padding: 0 16px
- Gap: 8px
- Border radius: 8px
- Background: slate-200 (light), surface-dark (dark)

### 4.5 Main Keypad
**Layout**: 4-column grid, 5 rows
**Grid Specification**:
```
AC    ⌫    %    ÷
7     8    9    ×
4     5    6    -
1     2    3    +
0     .    =    =
```

**Button Types**:
1. **Number Buttons** (0-9, .)
   - Background: slate-50 (light), #1a202c (dark)
   - Font size: 24px
   - Font weight: Medium

2. **Function Buttons** (AC, ⌫)
   - Background: slate-100 (light), surface-dark (dark)
   - Font size: 18px
   - Font weight: Medium

3. **Operator Buttons** (%, ÷, ×, -, +)
   - Background: primary/10 (light), primary/20 (dark)
   - Text color: Primary blue
   - Font size: 24px
   - Font weight: Bold

4. **Equals Button** (=)
   - **Special**: Spans 2 columns
   - Background: Primary blue (#135bec)
   - Text color: White
   - Font size: 30px
   - Shadow: Large glow effect
   - Most prominent button

**Button Styling**:
- Height: 64px
- Border radius: 16px
- Hover: Darken background
- Active: scale-95 transform
- Transition: All 200ms

**Keypad Container**:
- Background: white (light), #151a23 (dark)
- Border radius: 24px (top only)
- Padding: 16px
- Bottom padding: 32px
- Shadow: Elevated surface

---

## 5. Technical Architecture

### 5.1 Technology Stack

#### Frontend Framework
- **HTML5**: Semantic markup
- **CSS3**: Tailwind CSS for styling
- **JavaScript**: Vanilla JS or React for interactivity
- **Icons**: Material Symbols Outlined

#### Build Tools
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Vite/Webpack**: Module bundler (optional)

### 5.2 Calculation Engine

#### Requirements
- **Precision**: Handle floating-point arithmetic accurately
- **Expression Parsing**: Support complex expressions with parentheses
- **Order of Operations**: PEMDAS/BODMAS compliance
- **Error Handling**: Graceful handling of division by zero, invalid inputs

#### Recommended Libraries
- **math.js**: Comprehensive math library
- **decimal.js**: Arbitrary-precision decimal arithmetic
- **Custom parser**: For expression evaluation

### 5.3 State Management

#### Application State
```javascript
{
  currentValue: string,
  previousEquation: string,
  angleMode: 'DEG' | 'RAD',
  theme: 'light' | 'dark',
  mode: 'calculator' | 'converter',
  history: Array<{equation: string, result: string}>
}
```

#### Persistence
- **LocalStorage**: Save user preferences (theme, angle mode)
- **Session Storage**: Calculation history (optional)

### 5.4 Responsive Design

#### Breakpoints
- **Mobile**: < 640px (default, optimized)
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

#### Layout Adaptations
- Max-width container (448px) centered on larger screens
- Touch-optimized button sizes (minimum 44px × 44px)
- Keyboard support for desktop users

---

## 6. User Experience Flow

### 6.1 Basic Calculation Flow
1. User opens app → Calculator mode loads (default)
2. User taps number buttons → Display updates in real-time
3. User taps operator → Operator highlighted, ready for next input
4. User taps equals → Result calculated and displayed
5. Previous equation moves to history line

### 6.2 Advanced Function Flow
1. User scrolls function chips → Finds desired function (e.g., sin)
2. User taps function → Function inserted at cursor position
3. User enters value in parentheses → sin(45)
4. User taps equals → Result calculated based on angle mode
5. Result displayed with appropriate precision

### 6.3 Mode Switching Flow
1. User taps "Converter" in segmented control
2. Smooth transition animation (200ms)
3. Interface updates to show converter UI
4. Function chips and keypad adapt to converter mode

### 6.4 Error Handling Flow
1. User enters invalid expression (e.g., 5/0)
2. User taps equals
3. Display shows "Error" in red
4. User taps AC to clear and start over

---

## 7. Interaction Patterns

### 7.1 Button Interactions
- **Hover**: Background darkens slightly
- **Active/Press**: Scale down to 95% (scale-95)
- **Transition**: Smooth 200ms for all properties
- **Feedback**: Visual feedback on every interaction

### 7.2 Keyboard Support
**Number Keys**: 0-9, decimal point
**Operators**: +, -, *, /, %
**Functions**: 
- `s` → sin
- `c` → cos
- `t` → tan
- `l` → log
- `n` → ln
- `p` → π

**Controls**:
- `Enter` → Equals
- `Backspace` → Delete
- `Escape` → Clear (AC)
- `(` `)` → Parentheses

### 7.3 Touch Gestures
- **Tap**: Primary interaction
- **Swipe**: Scroll function chips horizontally
- **Long Press**: (Future) Access additional functions

---

## 8. Accessibility Requirements

### 8.1 WCAG 2.1 Compliance
- **Level AA** minimum compliance
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Visible focus states for keyboard navigation
- **Screen Reader Support**: Proper ARIA labels and roles

### 8.2 Semantic HTML
- Proper heading hierarchy
- Button elements for all interactive components
- Form elements for mode switcher (radio buttons)
- Landmark regions (header, main, navigation)

### 8.3 Keyboard Navigation
- Tab order follows visual flow
- All interactive elements keyboard accessible
- Escape key to close modals/menus
- Arrow keys for function chip navigation

---

## 9. Performance Requirements

### 9.1 Load Time
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Total Bundle Size**: < 200KB (gzipped)

### 9.2 Runtime Performance
- **Calculation Speed**: < 100ms for complex expressions
- **Animation Frame Rate**: 60fps for all transitions
- **Memory Usage**: < 50MB for typical session

### 9.3 Optimization Strategies
- Lazy load converter mode
- Debounce rapid button presses
- Memoize calculation results
- Use CSS transforms for animations (GPU acceleration)

---

## 10. Browser & Device Support

### 10.1 Browser Compatibility
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

### 10.2 Device Support
- **iOS**: 14+
- **Android**: 10+
- **Desktop**: Windows 10+, macOS 10.15+

### 10.3 Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced features for modern browsers
- Graceful degradation for older browsers

---

## 11. Future Enhancements (Phase 2+)

### 11.1 Advanced Features
- **Graphing Calculator**: Plot functions
- **Matrix Operations**: Matrix calculations
- **Complex Numbers**: i, real/imaginary parts
- **Statistics**: Mean, median, standard deviation
- **Programmable Functions**: User-defined functions

### 11.2 Productivity Features
- **Calculation History**: Persistent history with search
- **Favorites**: Save frequently used calculations
- **Export**: Share calculations as images or text
- **Multi-line Input**: Edit complex expressions

### 11.3 Converter Enhancements
- **Currency Conversion**: Real-time exchange rates
- **Custom Units**: User-defined conversion factors
- **Batch Conversion**: Convert multiple values at once

### 11.4 Collaboration Features
- **Cloud Sync**: Sync history across devices
- **Sharing**: Share calculations via link
- **Templates**: Pre-built calculation templates

---

## 12. Success Metrics

### 12.1 User Engagement
- **Daily Active Users (DAU)**: Target 10,000 within 3 months
- **Session Duration**: Average 5+ minutes
- **Return Rate**: 40% weekly return rate

### 12.2 Performance Metrics
- **Load Time**: 95th percentile < 3s
- **Error Rate**: < 0.1% of calculations
- **Crash Rate**: < 0.01% of sessions

### 12.3 User Satisfaction
- **App Store Rating**: 4.5+ stars
- **Net Promoter Score (NPS)**: 50+
- **Feature Adoption**: 60% use advanced functions

---

## 13. Development Phases

### Phase 1: MVP (4-6 weeks)
- ✅ Core calculator UI
- ✅ Basic arithmetic operations
- ✅ Advanced functions (sin, cos, tan, log, ln)
- ✅ Dark/Light theme toggle
- ✅ Angle mode (DEG/RAD)
- ✅ Responsive design

### Phase 2: Enhanced Features (3-4 weeks)
- 🔲 Converter mode implementation
- 🔲 Calculation history
- 🔲 Keyboard shortcuts
- 🔲 Error handling improvements
- 🔲 Accessibility audit & fixes

### Phase 3: Advanced Capabilities (4-6 weeks)
- 🔲 Graphing functionality
- 🔲 Matrix operations
- 🔲 Statistics functions
- 🔲 User preferences & settings
- 🔲 Cloud sync (optional)

### Phase 4: Polish & Optimization (2-3 weeks)
- 🔲 Performance optimization
- 🔲 Animation refinements
- 🔲 Cross-browser testing
- 🔲 User testing & feedback
- 🔲 Launch preparation

---

## 14. Technical Specifications

### 14.1 File Structure
```
engineering-calculator/
├── index.html
├── styles/
│   ├── main.css
│   └── themes.css
├── scripts/
│   ├── calculator.js
│   ├── converter.js
│   ├── parser.js
│   └── utils.js
├── assets/
│   ├── icons/
│   └── fonts/
└── README.md
```

### 14.2 Key Functions

#### Calculator Core
```javascript
// Expression evaluation
evaluate(expression: string, angleMode: 'DEG' | 'RAD'): number

// Format display
formatResult(value: number, precision: number): string

// Handle button press
handleInput(button: string): void

// Clear calculator
clear(): void

// Delete last character
backspace(): void
```

#### Converter Core
```javascript
// Convert units
convert(value: number, fromUnit: string, toUnit: string): number

// Get available units for category
getUnits(category: string): Array<Unit>
```

---

## 15. Design Assets & Resources

### 15.1 Reference Files
- **Design Mockup**: `screen.png` - Visual reference for UI
- **HTML Prototype**: `code.html` - Functional prototype with Tailwind CSS

### 15.2 External Resources
- **Fonts**: Google Fonts (Space Grotesk, Noto Sans)
- **Icons**: Material Symbols Outlined
- **Framework**: Tailwind CSS (via CDN or npm)

### 15.3 Color Tokens
```css
:root {
  --primary: #135bec;
  --bg-light: #f6f6f8;
  --bg-dark: #101622;
  --surface-dark: #1e2430;
  --surface-light: #ffffff;
  --keypad-dark: #151a23;
  --number-btn-dark: #1a202c;
}
```

---

## 16. Quality Assurance

### 16.1 Testing Strategy
- **Unit Tests**: Core calculation functions
- **Integration Tests**: UI component interactions
- **E2E Tests**: Complete user flows
- **Visual Regression**: UI consistency across updates

### 16.2 Test Cases
1. **Basic Arithmetic**: 2 + 2 = 4
2. **Order of Operations**: 2 + 3 × 4 = 14
3. **Trigonometry**: sin(30°) = 0.5
4. **Logarithms**: log(100) = 2
5. **Error Cases**: 1/0 = Error
6. **Edge Cases**: Very large numbers, very small numbers

### 16.3 Browser Testing
- Cross-browser compatibility testing
- Mobile device testing (iOS, Android)
- Accessibility testing with screen readers

---

## Appendix A: Glossary

- **DEG**: Degrees - Angle measurement unit (360° in a circle)
- **RAD**: Radians - Angle measurement unit (2π in a circle)
- **PEMDAS**: Order of operations (Parentheses, Exponents, Multiplication/Division, Addition/Subtraction)
- **Material Symbols**: Google's icon font library
- **Tailwind CSS**: Utility-first CSS framework
- **Segmented Control**: UI component for mutually exclusive options

---

## Appendix B: References

- **Design System**: Based on modern iOS/Android calculator apps
- **Color Palette**: Inspired by Material Design and Apple Human Interface Guidelines
- **Typography**: Following web typography best practices
- **Accessibility**: WCAG 2.1 Level AA standards

---

**Document Version**: 1.0  
**Last Updated**: 2025-12-23  
**Author**: Product Team  
**Status**: Draft for Review
