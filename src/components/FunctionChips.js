/**
 * Function Chips Component
 * 
 * Horizontal scrollable function buttons
 */

export class FunctionChips {
    constructor(container, onChipClick) {
        this.container = container;
        this.onChipClick = onChipClick;
        this.functions = [
            { label: 'sin', value: 'sin(' },
            { label: 'cos', value: 'cos(' },
            { label: 'tan', value: 'tan(' },
            { label: 'log', value: 'log(' },
            { label: 'ln', value: 'ln(' },
            { label: '(', value: '(' },
            { label: ')', value: ')' },
            { label: '^', value: '^' },
            { label: '√', value: 'sqrt(' },
            { label: 'π', value: 'π' },
            { label: 'e', value: 'e' }
        ];
        this.render();
    }

    render() {
        const chipsHTML = `
            <div class="function-chips">
                ${this.functions.map(fn => this.renderChip(fn)).join('')}
            </div>
        `;

        this.container.innerHTML = chipsHTML;
        this.attachEventListeners();
    }

    renderChip(func) {
        return `
            <button 
                class="function-chip" 
                data-value="${func.value}"
                aria-label="${func.label}"
            >
                ${func.label}
            </button>
        `;
    }

    attachEventListeners() {
        const chips = this.container.querySelectorAll('.function-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const value = chip.dataset.value;
                this.onChipClick(value);

                // Visual feedback
                chip.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    chip.style.transform = '';
                }, 100);
            });
        });
    }
}
