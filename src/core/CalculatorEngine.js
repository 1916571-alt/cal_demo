import * as math from 'mathjs';

/**
 * CalculatorEngine
 * 
 * Evaluates mathematical expressions and returns results.
 * Supports arithmetic, trigonometric, logarithmic, and algebraic operations.
 * 
 * Features:
 * - Basic arithmetic (+, -, *, /)
 * - Trigonometric functions (sin, cos, tan) with DEG/RAD modes
 * - Logarithmic functions (log, ln)
 * - Algebraic functions (sqrt, power)
 * - Mathematical constants (π, e)
 * - Result formatting for display
 * - Comprehensive error handling
 */

export class CalculatorEngine {
    constructor() {
        this.angleMode = 'DEG'; // Default to degrees
        this.maxDecimalPlaces = 10;

        // Configure math.js
        this.mathConfig = {
            number: 'BigNumber',
            precision: 64
        };
    }

    /**
     * Set the angle mode for trigonometric functions
     * @param {string} mode - 'DEG' or 'RAD'
     * @throws {Error} If mode is invalid
     */
    setAngleMode(mode) {
        if (mode !== 'DEG' && mode !== 'RAD') {
            throw new Error('Invalid angle mode. Must be "DEG" or "RAD"');
        }
        this.angleMode = mode;
    }

    /**
     * Get the current angle mode
     * @returns {string} - Current angle mode ('DEG' or 'RAD')
     */
    getAngleMode() {
        return this.angleMode;
    }

    /**
     * Evaluate a mathematical expression
     * @param {string} expression - The expression to evaluate
     * @returns {number} - The result of the evaluation
     * @throws {Error} If the expression is invalid or evaluation fails
     */
    evaluate(expression) {
        if (!expression || expression.trim() === '') {
            throw new Error('Empty expression');
        }

        try {
            // Preprocess the expression
            let processedExpression = this._preprocessExpression(expression);

            // Evaluate using math.js
            let result = math.evaluate(processedExpression);

            // Convert BigNumber to regular number if needed
            if (typeof result === 'object' && result.constructor.name === 'BigNumber') {
                result = Number(result.toString());
            }

            // Check for special error cases
            this._validateResult(result);

            return result;
        } catch (error) {
            // Provide more meaningful error messages
            this._handleEvaluationError(error);
        }
    }

    /**
     * Evaluate an expression and return a formatted string
     * @param {string} expression - The expression to evaluate
     * @returns {string} - Formatted result string
     */
    evaluateAndFormat(expression) {
        const result = this.evaluate(expression);
        return this._formatResult(result);
    }

    /**
     * Preprocess expression before evaluation
     * - Convert constants (π, e)
     * - Handle angle mode for trigonometric functions
     * @private
     */
    _preprocessExpression(expression) {
        let processed = expression;

        // Replace constants
        processed = processed.replace(/π/g, 'pi');
        processed = processed.replace(/\be\b/g, 'e');

        // Handle trigonometric functions based on angle mode
        if (this.angleMode === 'DEG') {
            // Convert degrees to radians for trig functions
            processed = this._convertTrigFunctionsToDeg(processed);
        }

        return processed;
    }

    /**
     * Convert trigonometric functions to work with degrees
     * @private
     */
    _convertTrigFunctionsToDeg(expression) {
        let result = expression;

        // Match trig functions and their arguments
        // sin(x) -> sin(x * pi / 180)
        result = result.replace(/sin\(([^)]+)\)/g, 'sin(($1) * pi / 180)');
        result = result.replace(/cos\(([^)]+)\)/g, 'cos(($1) * pi / 180)');
        result = result.replace(/tan\(([^)]+)\)/g, 'tan(($1) * pi / 180)');

        return result;
    }

    /**
     * Validate the result for special cases
     * @private
     */
    _validateResult(result) {
        // Check for division by zero
        if (!isFinite(result)) {
            if (isNaN(result)) {
                throw new Error('Invalid mathematical operation');
            }
            throw new Error('Division by zero or result too large');
        }

        // Check for complex numbers (shouldn't happen with our constraints)
        if (typeof result === 'object' && result.im !== undefined) {
            throw new Error('Complex numbers are not supported');
        }
    }

    /**
     * Handle evaluation errors and provide meaningful messages
     * @private
     */
    _handleEvaluationError(error) {
        const message = error.message.toLowerCase();

        // Division by zero
        if (message.includes('divide') && message.includes('zero')) {
            throw new Error('Division by zero');
        }

        // Invalid function
        if (message.includes('undefined symbol') || message.includes('undefined function')) {
            throw new Error('Invalid function or symbol');
        }

        // Syntax errors
        if (message.includes('syntax') || message.includes('unexpected')) {
            throw new Error('Invalid expression syntax');
        }

        // Parentheses errors
        if (message.includes('parenthes')) {
            throw new Error('Unbalanced parentheses');
        }

        // Logarithm errors
        if (message.includes('log') || message.includes('ln')) {
            throw new Error('Logarithm of non-positive number');
        }

        // Square root errors
        if (message.includes('sqrt')) {
            throw new Error('Square root of negative number');
        }

        // Tangent of 90 degrees
        if (message.includes('tan')) {
            throw new Error('Tangent undefined for this angle');
        }

        // Generic error
        throw new Error(`Calculation error: ${error.message}`);
    }

    /**
     * Format a numeric result for display
     * @private
     */
    _formatResult(result) {
        // Handle special cases
        if (!isFinite(result)) {
            return 'Error';
        }

        // Convert to number if it's a BigNumber
        const num = typeof result === 'number' ? result : Number(result.toString());

        // Check if it's an integer
        if (Number.isInteger(num)) {
            return num.toString();
        }

        // Format decimal numbers
        // Use toPrecision for very small or very large numbers
        const absNum = Math.abs(num);
        if (absNum < 0.000001 || absNum > 1e10) {
            // Use scientific notation for very small/large numbers
            const formatted = num.toExponential(6);
            // Clean up trailing zeros
            return formatted.replace(/\.?0+e/, 'e');
        }

        // For normal decimals, limit to maxDecimalPlaces
        const fixed = num.toFixed(this.maxDecimalPlaces);
        // Remove trailing zeros
        return parseFloat(fixed).toString();
    }
}
