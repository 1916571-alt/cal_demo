/**
 * Keypad Component
 * 
 * Calculator keypad with numbers, operators, and control buttons
 */

export class Keypad {
    constructor(container, onButtonClick) {
        this.container = container;
        this.onButtonClick = onButtonClick;
        this.buttons = this.getButtonLayout();
        this.render();
    }

    getButtonLayout() {
        return [
            { label: 'AC', value: 'clear', type: 'control' },
            { label: '⌫', value: 'backspace', type: 'control' },
            { label: '%', value: '%', type: 'operator' },
            { label: '÷', value: '÷', type: 'operator' },

            { label: '7', value: '7', type: 'number' },
            { label: '8', value: '8', type: 'number' },
            { label: '9', value: '9', type: 'number' },
            { label: '×', value: '×', type: 'operator' },

            { label: '4', value: '4', type: 'number' },
            { label: '5', value: '5', type: 'number' },
            { label: '6', value: '6', type: 'number' },
            { label: '-', value: '-', type: 'operator' },

            { label: '1', value: '1', type: 'number' },
            { label: '2', value: '2', type: 'number' },
            { label: '3', value: '3', type: 'number' },
            { label: '+', value: '+', type: 'operator' },

            { label: '0', value: '0', type: 'number' },
            { label: '.', value: '.', type: 'number' },
            { label: '=', value: 'equals', type: 'equals', span: 2 }
        ];
    }

    render() {
        const keypadHTML = `
            <div class="keypad">
                <div class="keypad-grid">
                    ${this.buttons.map(btn => this.renderButton(btn)).join('')}
                </div>
            </div>
        `;

        this.container.innerHTML = keypadHTML;
        this.attachEventListeners();
    }

    renderButton(button) {
        const spanClass = button.span ? `style="grid-column: span ${button.span};"` : '';
        return `
            <button 
                class="keypad-btn ${button.type}" 
                data-value="${button.value}"
                ${spanClass}
                aria-label="${button.label}"
            >
                ${button.label}
            </button>
        `;
    }

    attachEventListeners() {
        const buttons = this.container.querySelectorAll('.keypad-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.dataset.value;
                this.onButtonClick(value);

                // Visual feedback
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 100);
            });
        });
    }
}
