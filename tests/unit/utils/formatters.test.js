import { describe, it, expect } from 'vitest';
import { formatNumber, formatExpression, validateInput, debounce } from '../../../src/utils/formatters.js';

/**
 * Utility Functions Test Suite
 * 
 * Tests utility functions for formatting, validation, and helpers
 */

describe('Formatters and Validators', () => {
    describe('formatNumber', () => {
        it('should format integer without decimals', () => {
            expect(formatNumber(5)).toBe('5');
            expect(formatNumber(100)).toBe('100');
        });

        it('should format decimal numbers', () => {
            expect(formatNumber(3.14)).toBe('3.14');
            expect(formatNumber(0.5)).toBe('0.5');
        });

        it('should limit decimal places', () => {
            const result = formatNumber(1 / 3, 3);
            expect(result).toBe('0.333');
        });

        it('should remove trailing zeros', () => {
            expect(formatNumber(5.0)).toBe('5');
            expect(formatNumber(3.1400)).toBe('3.14');
        });

        it('should handle very large numbers', () => {
            const result = formatNumber(1000000000);
            expect(result).toBe('1000000000');
        });

        it('should handle very small numbers with scientific notation', () => {
            const result = formatNumber(0.000001);
            expect(result).toMatch(/^0\.000001$|^1e-6$/);
        });
    });

    describe('formatExpression', () => {
        it('should format expression for display', () => {
            expect(formatExpression('2+3')).toBe('2 + 3');
        });

        it('should format multiplication', () => {
            expect(formatExpression('2*3')).toBe('2 × 3');
        });

        it('should format division', () => {
            expect(formatExpression('10/2')).toBe('10 ÷ 2');
        });

        it('should handle complex expressions', () => {
            expect(formatExpression('2*sin(30)+3')).toBe('2 × sin(30) + 3');
        });

        it('should preserve parentheses', () => {
            expect(formatExpression('(2+3)*4')).toBe('(2 + 3) × 4');
        });
    });

    describe('validateInput', () => {
        it('should accept valid numbers', () => {
            expect(validateInput('123')).toBe(true);
            expect(validateInput('3.14')).toBe(true);
        });

        it('should accept valid operators', () => {
            expect(validateInput('2+3')).toBe(true);
            expect(validateInput('5-2')).toBe(true);
        });

        it('should accept valid functions', () => {
            expect(validateInput('sin(30)')).toBe(true);
            expect(validateInput('log(100)')).toBe(true);
        });

        it('should reject invalid characters', () => {
            expect(validateInput('2@3')).toBe(false);
            expect(validateInput('abc')).toBe(false);
        });

        it('should accept constants', () => {
            expect(validateInput('π')).toBe(true);
            expect(validateInput('2π')).toBe(true);
        });

        it('should accept parentheses', () => {
            expect(validateInput('(2+3)')).toBe(true);
        });
    });

    describe('debounce', () => {
        it('should delay function execution', async () => {
            let called = false;
            const fn = debounce(() => { called = true; }, 100);

            fn();
            expect(called).toBe(false);

            await new Promise(resolve => setTimeout(resolve, 150));
            expect(called).toBe(true);
        });

        it('should cancel previous calls', async () => {
            let count = 0;
            const fn = debounce(() => { count++; }, 100);

            fn();
            fn();
            fn();

            await new Promise(resolve => setTimeout(resolve, 150));
            expect(count).toBe(1);
        });
    });
});
