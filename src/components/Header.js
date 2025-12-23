/**
 * Header Component
 * 
 * App header with menu, title, and angle mode toggle
 */

export class Header {
    constructor(container, onAngleModeChange) {
        this.container = container;
        this.onAngleModeChange = onAngleModeChange;
        this.currentAngleMode = 'DEG';
        this.render();
    }

    render() {
        const headerHTML = `
            <div class="header">
                <button class="header-menu-btn" aria-label="Menu">
                    <span class="material-symbols-outlined">menu</span>
                </button>
                
                <h1 class="header-title">ENGINEERING</h1>
                
                <div class="angle-mode-toggle">
                    <button class="angle-mode-btn active" data-mode="DEG">DEG</button>
                    <button class="angle-mode-btn" data-mode="RAD">RAD</button>
                </div>
            </div>
        `;

        this.container.innerHTML = headerHTML;
        this.attachEventListeners();
    }

    attachEventListeners() {
        const buttons = this.container.querySelectorAll('.angle-mode-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const mode = button.dataset.mode;
                this.setAngleMode(mode);
                this.onAngleModeChange(mode);
            });
        });
    }

    setAngleMode(mode) {
        this.currentAngleMode = mode;

        const buttons = this.container.querySelectorAll('.angle-mode-btn');
        buttons.forEach(button => {
            if (button.dataset.mode === mode) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    getAngleMode() {
        return this.currentAngleMode;
    }
}
