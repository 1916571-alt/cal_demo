# Manual Testing Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open browser to `http://localhost:5173`

---

## Testing Checklist

### ✅ Basic Operations
- [ ] Click number buttons (0-9)
- [ ] Click decimal point
- [ ] Click operators (+, -, ×, ÷)
- [ ] Click equals button
- [ ] Verify: 2+2 = 4
- [ ] Verify: 10-3 = 7
- [ ] Verify: 5×6 = 30
- [ ] Verify: 20÷4 = 5

### ✅ Order of Operations
- [ ] Test: 2+3×4 = 14 (not 20)
- [ ] Test: (2+3)×4 = 20
- [ ] Test: 10-2×3 = 4
- [ ] Test: (10-2)×3 = 24

### ✅ Trigonometric Functions (DEG mode)
- [ ] Set angle mode to DEG
- [ ] Test: sin(30) = 0.5
- [ ] Test: cos(60) = 0.5
- [ ] Test: sin(90) = 1
- [ ] Test: cos(0) = 1

### ✅ Trigonometric Functions (RAD mode)
- [ ] Set angle mode to RAD
- [ ] Test: sin(π/2) ≈ 1
- [ ] Test: cos(π) ≈ -1

### ✅ Logarithmic Functions
- [ ] Test: log(100) = 2
- [ ] Test: log(10) = 1
- [ ] Test: ln(e) = 1

### ✅ Algebraic Functions
- [ ] Test: sqrt(16) = 4
- [ ] Test: sqrt(9) = 3
- [ ] Test: 2^3 = 8
- [ ] Test: 10^2 = 100

### ✅ Constants
- [ ] Test: π ≈ 3.14159
- [ ] Test: 2π ≈ 6.28318
- [ ] Test: e ≈ 2.71828

### ✅ Implicit Multiplication
- [ ] Test: 2π (should work)
- [ ] Test: 5(3+2) = 25
- [ ] Test: (2)(3) = 6
- [ ] Test: 2sin(30) = 1

### ✅ Error Handling
- [ ] Test: 5÷0 (should show Error)
- [ ] Test: sqrt(-1) (should show Error)
- [ ] Test: log(0) (should show Error)
- [ ] Verify error clears after 2 seconds

### ✅ UI Controls
- [ ] AC button clears display
- [ ] Backspace (⌫) deletes last character
- [ ] Cursor blinks in display
- [ ] History shows previous equation

### ✅ Keyboard Shortcuts
- [ ] Numbers: 0-9 work
- [ ] Operators: +, -, *, / work
- [ ] Enter key = equals
- [ ] Escape key = clear
- [ ] Backspace key = delete
- [ ] Parentheses: ( and ) work

### ✅ Angle Mode Toggle
- [ ] Click DEG/RAD toggle
- [ ] Verify mode changes
- [ ] Verify calculations use correct mode
- [ ] Verify mode persists on reload

### ✅ Visual Feedback
- [ ] Buttons show hover state
- [ ] Buttons scale down on click
- [ ] Equals button has glow effect
- [ ] Smooth transitions (200ms)

### ✅ Responsive Design
- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640-1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Verify layout adapts properly

### ✅ Theme System
- [ ] Dark mode displays correctly
- [ ] All text is readable
- [ ] Contrast ratios are good

### ✅ Function Chips
- [ ] Scroll horizontally
- [ ] All functions accessible
- [ ] Click feedback works
- [ ] Touch/swipe works on mobile

---

## Browser Testing

Test in the following browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Known Limitations

- Converter mode not yet implemented (Phase 3)
- Light theme toggle not yet implemented
- History view not yet implemented
- Menu button not yet functional

---

## Next Steps

If all tests pass:
1. ✅ Phase 1 & 2 Complete
2. 🔄 Phase 3: Converter Mode (optional)
3. 🔄 Phase 4: Polish & Optimization
4. 🔄 Phase 5: Final QA
5. 🔄 Phase 6: Deployment
