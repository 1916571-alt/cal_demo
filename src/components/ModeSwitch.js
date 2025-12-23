/**
 * Mode Switch Component
 * 
 * Toggle between Calculator and Converter modes
 */

export class ModeSwitch {
    constructor(container, onModeChange) {
        this.container = container;
        this.onModeChange = onModeChange;
        this.currentMode = 'calculator';
        this.render();
    }

    render() {
        const modeSwitchHTML = `
            <div class="mode-switch">
                <button class="mode-switch-btn active" data-mode="calculator">
                    Calculator
                </button>
                <button class="mode-switch-btn" data-mode="converter">
                    Converter
                </button>
            </div>
        `;

        this.container.innerHTML = modeSwitchHTML;
        this.attachEventListeners();
    }

    attachEventListeners() {
        const buttons = this.container.querySelectorAll('.mode-switch-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const mode = button.dataset.mode;
                this.setMode(mode);
                this.onModeChange(mode);
            });
        });
    }

    setMode(mode) {
        this.currentMode = mode;

        const buttons = this.container.querySelectorAll('.mode-switch-btn');
        buttons.forEach(button => {
            if (button.dataset.mode === mode) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    getMode() {
        return this.currentMode;
    }
}
