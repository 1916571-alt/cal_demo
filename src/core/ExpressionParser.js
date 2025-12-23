/**
 * ExpressionParser
 * 
 * Parses user input expressions and converts them into mathematically
 * valid expressions that can be evaluated by the calculator engine.
 * 
 * Features:
 * - Number parsing (single, multi-digit, decimal, negative)
 * - Operator symbol conversion (× → *, ÷ → /)
 * - Parentheses validation
 * - Implicit multiplication handling
 * - Input validation and error handling
 */

export class ExpressionParser {
    constructor() {
        // Mathematical constants that can be used in expressions
        this.constants = ['π', 'e'];

        // Mathematical functions that can be used in expressions
        this.functions = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'];

        // Valid characters in expressions
        this.validChars = /^[0-9+\-*/().πe\s×÷sincotanlgqr]+$/;
    }

    /**
     * Parse an expression string and convert it to a valid mathematical expression
     * @param {string} expression - The input expression to parse
     * @returns {string} - The parsed expression
     * @throws {Error} - If the expression is invalid
     */
    parse(expression) {
        if (!expression || typeof expression !== 'string') {
            return '';
        }

        // Remove all whitespace
        let parsed = expression.replace(/\s+/g, '');

        // Handle empty string after whitespace removal
        if (parsed === '') {
            return '';
        }

        // Validate characters
        this._validateCharacters(parsed);

        // Convert operator symbols
        parsed = this._convertOperators(parsed);

        // Normalize decimal numbers (e.g., .5 → 0.5)
        parsed = this._normalizeDecimals(parsed);

        // Validate number format
        this._validateNumberFormat(parsed);

        // Validate parentheses
        this._validateParentheses(parsed);

        // Handle implicit multiplication
        parsed = this._handleImplicitMultiplication(parsed);

        return parsed;
    }

    /**
     * Validate that the expression contains only valid characters
     * @private
     */
    _validateCharacters(expression) {
        if (!this.validChars.test(expression)) {
            throw new Error('Invalid character in expression');
        }
    }

    /**
     * Convert UI operator symbols to standard mathematical operators
     * @private
     */
    _convertOperators(expression) {
        return expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
    }

    /**
     * Normalize decimal numbers (e.g., .5 → 0.5)
     * @private
     */
    _normalizeDecimals(expression) {
        // Replace leading decimal point with 0.
        return expression.replace(/(^|[^0-9.])\.(\d)/g, '$10.$2');
    }

    /**
     * Validate number format (e.g., no multiple consecutive decimal points)
     * @private
     */
    _validateNumberFormat(expression) {
        // Check for multiple consecutive decimal points
        if (/\.\.+/.test(expression)) {
            throw new Error('Invalid number format: multiple decimal points');
        }

        // Check for numbers with multiple decimal points
        const numbers = expression.match(/\d+\.?\d*\.?\d*/g);
        if (numbers) {
            for (const num of numbers) {
                const dotCount = (num.match(/\./g) || []).length;
                if (dotCount > 1) {
                    throw new Error('Invalid number format: multiple decimal points in number');
                }
            }
        }
    }

    /**
     * Validate that parentheses are balanced and properly ordered
     * @private
     */
    _validateParentheses(expression) {
        let balance = 0;

        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];

            if (char === '(') {
                balance++;
            } else if (char === ')') {
                balance--;

                // If balance goes negative, we have a closing paren without opening
                if (balance < 0) {
                    throw new Error('Unbalanced parentheses');
                }
            }
        }

        // If balance is not zero, we have unmatched opening parens
        if (balance !== 0) {
            throw new Error('Unbalanced parentheses');
        }
    }

    /**
     * Handle implicit multiplication cases:
     * - Number before constant: 2π → 2*π
     * - Number before parenthesis: 5(3) → 5*(3)
     * - Parenthesis before number/parenthesis: (2)3 → (2)*3, (2)(3) → (2)*(3)
     * - Number before function: 2sin(30) → 2*sin(30)
     * @private
     */
    _handleImplicitMultiplication(expression) {
        let result = expression;

        // Number or ) before constant (π, e)
        // Match: digit or ) followed by constant
        result = result.replace(/(\d|\.|\))([πe])/g, '$1*$2');

        // Number or ) before opening parenthesis
        // Match: digit or ) followed by (
        result = result.replace(/(\d|\.|\))(\()/g, '$1*$2');

        // Number or ) before function name
        // Match: digit or ) followed by function name
        for (const func of this.functions) {
            const regex = new RegExp(`(\\d|\\.|\\))(${func})`, 'g');
            result = result.replace(regex, '$1*$2');
        }

        // Constant before opening parenthesis
        // Match: constant followed by (
        result = result.replace(/([πe])(\()/g, '$1*$2');

        return result;
    }
}
