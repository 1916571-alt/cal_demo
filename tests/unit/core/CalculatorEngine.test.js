import { describe, it, expect, beforeEach } from 'vitest';
import { CalculatorEngine } from '../../../src/core/CalculatorEngine.js';

/**
 * CalculatorEngine Test Suite
 * 
 * Tests the calculator engine that evaluates mathematical expressions
 * and returns formatted results.
 */

describe('CalculatorEngine', () => {
    let calculator;

    beforeEach(() => {
        calculator = new CalculatorEngine();
    });

    describe('Basic Arithmetic Operations', () => {
        describe('Addition', () => {
            it('should add two positive numbers', () => {
                const result = calculator.evaluate('2+3');
                expect(result).toBe(5);
            });

            it('should add multiple numbers', () => {
                const result = calculator.evaluate('1+2+3+4');
                expect(result).toBe(10);
            });

            it('should handle decimal addition', () => {
                const result = calculator.evaluate('1.5+2.5');
                expect(result).toBe(4);
            });
        });

        describe('Subtraction', () => {
            it('should subtract two numbers', () => {
                const result = calculator.evaluate('5-3');
                expect(result).toBe(2);
            });

            it('should handle negative results', () => {
                const result = calculator.evaluate('3-5');
                expect(result).toBe(-2);
            });

            it('should handle decimal subtraction', () => {
                const result = calculator.evaluate('5.5-2.3');
                expect(result).toBeCloseTo(3.2, 10);
            });
        });

        describe('Multiplication', () => {
            it('should multiply two numbers', () => {
                const result = calculator.evaluate('4*5');
                expect(result).toBe(20);
            });

            it('should handle decimal multiplication', () => {
                const result = calculator.evaluate('2.5*4');
                expect(result).toBe(10);
            });

            it('should handle multiplication by zero', () => {
                const result = calculator.evaluate('5*0');
                expect(result).toBe(0);
            });
        });

        describe('Division', () => {
            it('should divide two numbers', () => {
                const result = calculator.evaluate('10/2');
                expect(result).toBe(5);
            });

            it('should handle decimal division', () => {
                const result = calculator.evaluate('7/2');
                expect(result).toBe(3.5);
            });

            it('should throw error for division by zero', () => {
                expect(() => calculator.evaluate('5/0')).toThrow('Division by zero');
            });
        });

        describe('Order of Operations (PEMDAS)', () => {
            it('should follow order of operations: 2+3*4', () => {
                const result = calculator.evaluate('2+3*4');
                expect(result).toBe(14);
            });

            it('should follow order of operations: (2+3)*4', () => {
                const result = calculator.evaluate('(2+3)*4');
                expect(result).toBe(20);
            });

            it('should handle complex expression: 2+3*4-10/2', () => {
                const result = calculator.evaluate('2+3*4-10/2');
                expect(result).toBe(9);
            });

            it('should handle nested parentheses: ((2+3)*4)/2', () => {
                const result = calculator.evaluate('((2+3)*4)/2');
                expect(result).toBe(10);
            });
        });
    });

    describe('Trigonometric Functions', () => {
        describe('Sine (DEG mode)', () => {
            beforeEach(() => {
                calculator.setAngleMode('DEG');
            });

            it('should calculate sin(0) = 0', () => {
                const result = calculator.evaluate('sin(0)');
                expect(result).toBeCloseTo(0, 10);
            });

            it('should calculate sin(30) = 0.5', () => {
                const result = calculator.evaluate('sin(30)');
                expect(result).toBeCloseTo(0.5, 10);
            });

            it('should calculate sin(90) = 1', () => {
                const result = calculator.evaluate('sin(90)');
                expect(result).toBeCloseTo(1, 10);
            });

            it('should calculate sin(180) = 0', () => {
                const result = calculator.evaluate('sin(180)');
                expect(result).toBeCloseTo(0, 10);
            });
        });

        describe('Sine (RAD mode)', () => {
            beforeEach(() => {
                calculator.setAngleMode('RAD');
            });

            it('should calculate sin(0) = 0', () => {
                const result = calculator.evaluate('sin(0)');
                expect(result).toBeCloseTo(0, 10);
            });

            it('should calculate sin(π/2) = 1', () => {
                const result = calculator.evaluate('sin(π/2)');
                expect(result).toBeCloseTo(1, 10);
            });

            it('should calculate sin(π) = 0', () => {
                const result = calculator.evaluate('sin(π)');
                expect(result).toBeCloseTo(0, 10);
            });
        });

        describe('Cosine (DEG mode)', () => {
            beforeEach(() => {
                calculator.setAngleMode('DEG');
            });

            it('should calculate cos(0) = 1', () => {
                const result = calculator.evaluate('cos(0)');
                expect(result).toBeCloseTo(1, 10);
            });

            it('should calculate cos(60) = 0.5', () => {
                const result = calculator.evaluate('cos(60)');
                expect(result).toBeCloseTo(0.5, 10);
            });

            it('should calculate cos(90) = 0', () => {
                const result = calculator.evaluate('cos(90)');
                expect(result).toBeCloseTo(0, 10);
            });
        });

        describe('Tangent (DEG mode)', () => {
            beforeEach(() => {
                calculator.setAngleMode('DEG');
            });

            it('should calculate tan(0) = 0', () => {
                const result = calculator.evaluate('tan(0)');
                expect(result).toBeCloseTo(0, 10);
            });

            it('should calculate tan(45) = 1', () => {
                const result = calculator.evaluate('tan(45)');
                expect(result).toBeCloseTo(1, 10);
            });

            it('should throw error for tan(90)', () => {
                expect(() => calculator.evaluate('tan(90)')).toThrow();
            });
        });
    });

    describe('Logarithmic Functions', () => {
        describe('Base-10 Logarithm (log)', () => {
            it('should calculate log(10) = 1', () => {
                const result = calculator.evaluate('log(10)');
                expect(result).toBeCloseTo(1, 10);
            });

            it('should calculate log(100) = 2', () => {
                const result = calculator.evaluate('log(100)');
                expect(result).toBeCloseTo(2, 10);
            });

            it('should calculate log(1) = 0', () => {
                const result = calculator.evaluate('log(1)');
                expect(result).toBeCloseTo(0, 10);
            });

            it('should throw error for log(0)', () => {
                expect(() => calculator.evaluate('log(0)')).toThrow();
            });

            it('should throw error for log(-1)', () => {
                expect(() => calculator.evaluate('log(-1)')).toThrow();
            });
        });

        describe('Natural Logarithm (ln)', () => {
            it('should calculate ln(e) = 1', () => {
                const result = calculator.evaluate('ln(e)');
                expect(result).toBeCloseTo(1, 10);
            });

            it('should calculate ln(1) = 0', () => {
                const result = calculator.evaluate('ln(1)');
                expect(result).toBeCloseTo(0, 10);
            });

            it('should throw error for ln(0)', () => {
                expect(() => calculator.evaluate('ln(0)')).toThrow();
            });
        });
    });

    describe('Algebraic Functions', () => {
        describe('Square Root', () => {
            it('should calculate sqrt(4) = 2', () => {
                const result = calculator.evaluate('sqrt(4)');
                expect(result).toBe(2);
            });

            it('should calculate sqrt(9) = 3', () => {
                const result = calculator.evaluate('sqrt(9)');
                expect(result).toBe(3);
            });

            it('should calculate sqrt(2)', () => {
                const result = calculator.evaluate('sqrt(2)');
                expect(result).toBeCloseTo(1.414213562, 5);
            });

            it('should throw error for sqrt(-1)', () => {
                expect(() => calculator.evaluate('sqrt(-1)')).toThrow();
            });
        });

        describe('Power/Exponentiation', () => {
            it('should calculate 2^3 = 8', () => {
                const result = calculator.evaluate('2^3');
                expect(result).toBe(8);
            });

            it('should calculate 10^2 = 100', () => {
                const result = calculator.evaluate('10^2');
                expect(result).toBe(100);
            });

            it('should calculate 2^0 = 1', () => {
                const result = calculator.evaluate('2^0');
                expect(result).toBe(1);
            });

            it('should calculate 4^0.5 = 2', () => {
                const result = calculator.evaluate('4^0.5');
                expect(result).toBe(2);
            });

            it('should calculate negative exponents: 2^-1 = 0.5', () => {
                const result = calculator.evaluate('2^-1');
                expect(result).toBe(0.5);
            });
        });
    });

    describe('Mathematical Constants', () => {
        it('should evaluate π correctly', () => {
            const result = calculator.evaluate('π');
            expect(result).toBeCloseTo(Math.PI, 10);
        });

        it('should evaluate e correctly', () => {
            const result = calculator.evaluate('e');
            expect(result).toBeCloseTo(Math.E, 10);
        });

        it('should use π in calculations: 2*π', () => {
            const result = calculator.evaluate('2*π');
            expect(result).toBeCloseTo(2 * Math.PI, 10);
        });

        it('should use e in calculations: e^2', () => {
            const result = calculator.evaluate('e^2');
            expect(result).toBeCloseTo(Math.E ** 2, 10);
        });
    });

    describe('Complex Expressions', () => {
        it('should evaluate: 2*sin(30)+3', () => {
            calculator.setAngleMode('DEG');
            const result = calculator.evaluate('2*sin(30)+3');
            expect(result).toBeCloseTo(4, 10);
        });

        it('should evaluate: sqrt(16)+log(100)', () => {
            const result = calculator.evaluate('sqrt(16)+log(100)');
            expect(result).toBeCloseTo(6, 10);
        });

        it('should evaluate: (2+3)*sin(90)', () => {
            calculator.setAngleMode('DEG');
            const result = calculator.evaluate('(2+3)*sin(90)');
            expect(result).toBeCloseTo(5, 10);
        });

        it('should evaluate: 2^3+sqrt(9)*log(10)', () => {
            const result = calculator.evaluate('2^3+sqrt(9)*log(10)');
            expect(result).toBeCloseTo(11, 10);
        });
    });

    describe('Result Formatting', () => {
        it('should format integer results without decimals', () => {
            const result = calculator.evaluateAndFormat('2+3');
            expect(result).toBe('5');
        });

        it('should format decimal results with appropriate precision', () => {
            const result = calculator.evaluateAndFormat('1/3');
            expect(result).toMatch(/^0\.333/);
        });

        it('should handle very large numbers', () => {
            const result = calculator.evaluateAndFormat('10^10');
            expect(result).toBe('10000000000');
        });

        it('should format very small decimals in scientific notation', () => {
            const result = calculator.evaluateAndFormat('1/1000000');
            expect(result).toMatch(/^0\.000001$|^1e-6$/);
        });

        it('should limit decimal places for display', () => {
            const result = calculator.evaluateAndFormat('π');
            const decimalPlaces = result.split('.')[1]?.length || 0;
            expect(decimalPlaces).toBeLessThanOrEqual(10);
        });
    });

    describe('Error Handling', () => {
        it('should throw error for empty expression', () => {
            expect(() => calculator.evaluate('')).toThrow('Empty expression');
        });

        it('should throw error for invalid syntax', () => {
            expect(() => calculator.evaluate('2++')).toThrow();
        });

        it('should throw error for unmatched parentheses', () => {
            expect(() => calculator.evaluate('(2+3')).toThrow();
        });

        it('should throw error for invalid function name', () => {
            expect(() => calculator.evaluate('foo(5)')).toThrow();
        });

        it('should provide meaningful error messages', () => {
            try {
                calculator.evaluate('5/0');
            } catch (error) {
                expect(error.message).toContain('Division by zero');
            }
        });
    });

    describe('Angle Mode', () => {
        it('should default to DEG mode', () => {
            expect(calculator.getAngleMode()).toBe('DEG');
        });

        it('should allow switching to RAD mode', () => {
            calculator.setAngleMode('RAD');
            expect(calculator.getAngleMode()).toBe('RAD');
        });

        it('should throw error for invalid angle mode', () => {
            expect(() => calculator.setAngleMode('INVALID')).toThrow('Invalid angle mode');
        });

        it('should produce different results for DEG vs RAD', () => {
            calculator.setAngleMode('DEG');
            const degResult = calculator.evaluate('sin(90)');

            calculator.setAngleMode('RAD');
            const radResult = calculator.evaluate('sin(90)');

            expect(degResult).not.toBeCloseTo(radResult, 1);
        });
    });
});
