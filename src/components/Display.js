/**
 * Display Component
 * 
 * Shows the calculator display with history and current result
 */

export class Display {
    constructor(container) {
        this.container = container;
        this.historyElement = null;
        this.resultElement = null;
        this.cursorElement = null;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="display">
                <div class="display-history"></div>
                <div class="display-result">
                    <span class="display-value">0</span>
                    <span class="display-cursor"></span>
                </div>
            </div>
        `;

        this.historyElement = this.container.querySelector('.display-history');
        this.resultElement = this.container.querySelector('.display-value');
        this.cursorElement = this.container.querySelector('.display-cursor');
    }

    /**
     * Update the display
     * @param {string} value - Current value to display
     * @param {string} history - History equation
     * @param {boolean} isError - Whether this is an error state
     */
    update(value, history = '', isError = false) {
        // Update history
        this.historyElement.textContent = history;

        // Update result
        this.resultElement.textContent = value || '0';

        // Update error state
        const resultContainer = this.container.querySelector('.display-result');
        if (isError) {
            resultContainer.classList.add('error');
        } else {
            resultContainer.classList.remove('error');
        }
    }

    /**
     * Show cursor
     */
    showCursor() {
        this.cursorElement.style.display = 'inline-block';
    }

    /**
     * Hide cursor
     */
    hideCursor() {
        this.cursorElement.style.display = 'none';
    }

    /**
     * Clear display
     */
    clear() {
        this.update('0', '');
    }
}
