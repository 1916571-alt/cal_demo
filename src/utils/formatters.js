/**
 * Utility Functions
 * 
 * Helper functions for formatting numbers, expressions, validation, and more
 */

/**
 * Format a number for display
 * @param {number} num - Number to format
 * @param {number} maxDecimals - Maximum decimal places (default: 10)
 * @returns {string} - Formatted number string
 */
export function formatNumber(num, maxDecimals = 10) {
    if (!isFinite(num)) {
        return 'Error';
    }

    // Handle integers
    if (Number.isInteger(num)) {
        return num.toString();
    }

    // Handle very small or very large numbers
    const absNum = Math.abs(num);
    if (absNum < 0.000001 || absNum > 1e10) {
        const formatted = num.toExponential(6);
        return formatted.replace(/\.?0+e/, 'e');
    }

    // Format decimal numbers
    const fixed = num.toFixed(maxDecimals);
    return parseFloat(fixed).toString();
}

/**
 * Format an expression for display (add spaces, convert symbols)
 * @param {string} expression - Expression to format
 * @returns {string} - Formatted expression
 */
export function formatExpression(expression) {
    let formatted = expression;

    // Convert operators to display symbols
    formatted = formatted.replace(/\*/g, ' × ');
    formatted = formatted.replace(/\//g, ' ÷ ');
    formatted = formatted.replace(/\+/g, ' + ');
    formatted = formatted.replace(/(?<!\()\-(?!\))/g, ' - '); // Avoid spacing in negatives

    // Clean up extra spaces
    formatted = formatted.replace(/\s+/g, ' ').trim();

    return formatted;
}

/**
 * Validate user input
 * @param {string} input - Input to validate
 * @returns {boolean} - True if valid
 */
export function validateInput(input) {
    // Allow numbers, operators, functions, constants, parentheses
    const validPattern = /^[0-9+\-*/().πe\s×÷sincotanlgqr]+$/;
    return validPattern.test(input);
}

/**
 * Debounce a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Memoize a function (cache results)
 * @param {Function} func - Function to memoize
 * @returns {Function} - Memoized function
 */
export function memoize(func) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = func(...args);
        cache.set(key, result);
        return result;
    };
}
