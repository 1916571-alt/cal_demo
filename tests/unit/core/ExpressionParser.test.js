import { describe, it, expect } from 'vitest';
import { ExpressionParser } from '../../../src/core/ExpressionParser.js';

/**
 * ExpressionParser Test Suite
 * 
 * Tests the expression parser that converts user input into
 * mathematically valid expressions for evaluation.
 */

describe('ExpressionParser', () => {
    describe('Number Parsing', () => {
        describe('Single digit numbers', () => {
            it('should parse single digit "5" correctly', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('5');
                expect(result).toBe('5');
            });

            it('should parse single digit "0" correctly', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('0');
                expect(result).toBe('0');
            });

            it('should parse single digit "9" correctly', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('9');
                expect(result).toBe('9');
            });
        });

        describe('Multi-digit numbers', () => {
            it('should parse "123" correctly', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('123');
                expect(result).toBe('123');
            });

            it('should parse "999" correctly', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('999');
                expect(result).toBe('999');
            });
        });

        describe('Decimal numbers', () => {
            it('should parse "3.14" correctly', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('3.14');
                expect(result).toBe('3.14');
            });

            it('should parse ".5" as "0.5"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('.5');
                expect(result).toBe('0.5');
            });

            it('should parse "0.5" correctly', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('0.5');
                expect(result).toBe('0.5');
            });
        });

        describe('Negative numbers', () => {
            it('should parse "-5" correctly', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('-5');
                expect(result).toBe('-5');
            });

            it('should parse "-3.14" correctly', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('-3.14');
                expect(result).toBe('-3.14');
            });
        });
    });

    describe('Operator Symbol Conversion', () => {
        it('should convert × to *', () => {
            const parser = new ExpressionParser();
            const result = parser.parse('5×3');
            expect(result).toBe('5*3');
        });

        it('should convert ÷ to /', () => {
            const parser = new ExpressionParser();
            const result = parser.parse('10÷2');
            expect(result).toBe('10/2');
        });

        it('should handle multiple operator conversions', () => {
            const parser = new ExpressionParser();
            const result = parser.parse('10×5÷2');
            expect(result).toBe('10*5/2');
        });

        it('should preserve + and - operators', () => {
            const parser = new ExpressionParser();
            const result = parser.parse('5+3-2');
            expect(result).toBe('5+3-2');
        });
    });

    describe('Parentheses Validation', () => {
        it('should accept balanced parentheses', () => {
            const parser = new ExpressionParser();
            const result = parser.parse('(5+3)');
            expect(result).toBe('(5+3)');
        });

        it('should accept nested parentheses', () => {
            const parser = new ExpressionParser();
            const result = parser.parse('((5+3)×2)');
            expect(result).toBe('((5+3)*2)');
        });

        it('should throw error for unbalanced opening parenthesis', () => {
            const parser = new ExpressionParser();
            expect(() => parser.parse('(5+3')).toThrow('Unbalanced parentheses');
        });

        it('should throw error for unbalanced closing parenthesis', () => {
            const parser = new ExpressionParser();
            expect(() => parser.parse('5+3)')).toThrow('Unbalanced parentheses');
        });

        it('should throw error for wrong order parentheses', () => {
            const parser = new ExpressionParser();
            expect(() => parser.parse(')5+3(')).toThrow('Unbalanced parentheses');
        });
    });

    describe('Implicit Multiplication', () => {
        describe('Number before constant', () => {
            it('should convert "2π" to "2*π"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('2π');
                expect(result).toBe('2*π');
            });

            it('should convert "3.14π" to "3.14*π"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('3.14π');
                expect(result).toBe('3.14*π');
            });

            it('should convert "2e" to "2*e"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('2e');
                expect(result).toBe('2*e');
            });
        });

        describe('Number before parenthesis', () => {
            it('should convert "5(3+2)" to "5*(3+2)"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('5(3+2)');
                expect(result).toBe('5*(3+2)');
            });

            it('should convert "2.5(10)" to "2.5*(10)"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('2.5(10)');
                expect(result).toBe('2.5*(10)');
            });
        });

        describe('Parenthesis before number or parenthesis', () => {
            it('should convert "(2)3" to "(2)*3"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('(2)3');
                expect(result).toBe('(2)*3');
            });

            it('should convert "(2)(3)" to "(2)*(3)"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('(2)(3)');
                expect(result).toBe('(2)*(3)');
            });

            it('should convert "(5+2)(3-1)" to "(5+2)*(3-1)"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('(5+2)(3-1)');
                expect(result).toBe('(5+2)*(3-1)');
            });
        });

        describe('Number before function', () => {
            it('should convert "2sin(30)" to "2*sin(30)"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('2sin(30)');
                expect(result).toBe('2*sin(30)');
            });

            it('should convert "3cos(45)" to "3*cos(45)"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('3cos(45)');
                expect(result).toBe('3*cos(45)');
            });

            it('should convert "5log(100)" to "5*log(100)"', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('5log(100)');
                expect(result).toBe('5*log(100)');
            });
        });

        describe('Complex implicit multiplication', () => {
            it('should handle "2π(3+4)" correctly', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('2π(3+4)');
                expect(result).toBe('2*π*(3+4)');
            });

            it('should handle "(2)(3)π" correctly', () => {
                const parser = new ExpressionParser();
                const result = parser.parse('(2)(3)π');
                expect(result).toBe('(2)*(3)*π');
            });
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty string', () => {
            const parser = new ExpressionParser();
            const result = parser.parse('');
            expect(result).toBe('');
        });

        it('should handle whitespace only', () => {
            const parser = new ExpressionParser();
            const result = parser.parse('   ');
            expect(result).toBe('');
        });

        it('should throw error for invalid characters', () => {
            const parser = new ExpressionParser();
            expect(() => parser.parse('5@3')).toThrow('Invalid character');
        });

        it('should throw error for multiple consecutive decimal points', () => {
            const parser = new ExpressionParser();
            expect(() => parser.parse('3..14')).toThrow('Invalid number format');
        });

        it('should handle expressions with spaces', () => {
            const parser = new ExpressionParser();
            const result = parser.parse('5 + 3 × 2');
            expect(result).toBe('5+3*2');
        });
    });

    describe('Complex Expressions', () => {
        it('should parse complex expression with all features', () => {
            const parser = new ExpressionParser();
            const result = parser.parse('2π×sin(45)+3(5÷2)');
            expect(result).toBe('2*π*sin(45)+3*(5/2)');
        });

        it('should parse nested functions with implicit multiplication', () => {
            const parser = new ExpressionParser();
            const result = parser.parse('2sin(3cos(45))');
            expect(result).toBe('2*sin(3*cos(45))');
        });
    });
});
