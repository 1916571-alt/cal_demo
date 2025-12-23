/**
 * StateManager
 * 
 * Manages application state with immutable updates, observer pattern for subscriptions,
 * and localStorage persistence.
 * 
 * Features:
 * - Immutable state updates
 * - Observer pattern for state change notifications
 * - localStorage persistence for user preferences
 * - History management with size limits
 * - State validation
 * - Reset functionality
 */

export class StateManager {
    constructor() {
        // Default state
        this.defaultState = {
            currentValue: '',
            previousEquation: '',
            angleMode: 'DEG',
            theme: 'dark',
            mode: 'calculator',
            history: []
        };

        // Initialize state
        this.state = this._loadState();

        // Subscribers for state changes
        this.subscribers = [];

        // Maximum history size
        this.maxHistorySize = 100;

        // localStorage key
        this.storageKey = 'calculator-state';
    }

    /**
     * Get the current state (immutable copy)
     * @returns {Object} - Current state
     */
    getState() {
        return { ...this.state, history: [...this.state.history] };
    }

    /**
     * Update state with new values
     * @param {Object} updates - Partial state updates
     * @throws {Error} If validation fails
     */
    updateState(updates) {
        // Validate updates
        this._validateUpdates(updates);

        // Create new state (immutable update)
        this.state = {
            ...this.state,
            ...updates
        };

        // Persist to localStorage
        this._saveState();

        // Notify subscribers
        this._notifySubscribers();
    }

    /**
     * Add a calculation to history
     * @param {string} equation - The equation that was calculated
     * @param {string} result - The result of the calculation
     */
    addToHistory(equation, result) {
        const historyItem = {
            equation,
            result,
            timestamp: new Date().toISOString()
        };

        // Create new history array
        let newHistory = [...this.state.history, historyItem];

        // Limit history size (keep most recent)
        if (newHistory.length > this.maxHistorySize) {
            newHistory = newHistory.slice(-this.maxHistorySize);
        }

        // Update state
        this.updateState({ history: newHistory });
    }

    /**
     * Clear calculation history
     */
    clearHistory() {
        this.updateState({ history: [] });
    }

    /**
     * Subscribe to state changes
     * @param {Function} callback - Function to call when state changes
     * @returns {Function} - Unsubscribe function
     */
    subscribe(callback) {
        this.subscribers.push(callback);

        // Return unsubscribe function
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    /**
     * Reset state to defaults
     */
    reset() {
        this.state = { ...this.defaultState, history: [] };
        this._clearStorage();
        this._notifySubscribers();
    }

    /**
     * Reset only calculation-related state (preserve settings)
     */
    resetCalculation() {
        this.updateState({
            currentValue: '',
            previousEquation: ''
        });
    }

    /**
     * Load state from localStorage
     * @private
     */
    _loadState() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Merge with default state to handle new properties
                return {
                    ...this.defaultState,
                    ...parsed,
                    // Don't persist these values
                    currentValue: '',
                    previousEquation: ''
                };
            }
        } catch (error) {
            console.warn('Failed to load state from localStorage:', error);
        }

        return { ...this.defaultState };
    }

    /**
     * Save state to localStorage
     * @private
     */
    _saveState() {
        try {
            // Only save persistent properties
            const toSave = {
                angleMode: this.state.angleMode,
                theme: this.state.theme,
                mode: this.state.mode,
                history: this.state.history
            };

            localStorage.setItem(this.storageKey, JSON.stringify(toSave));
        } catch (error) {
            console.warn('Failed to save state to localStorage:', error);
        }
    }

    /**
     * Clear localStorage
     * @private
     */
    _clearStorage() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.warn('Failed to clear localStorage:', error);
        }
    }

    /**
     * Validate state updates
     * @private
     */
    _validateUpdates(updates) {
        // Validate angleMode
        if (updates.angleMode !== undefined) {
            if (updates.angleMode !== 'DEG' && updates.angleMode !== 'RAD') {
                throw new Error('Invalid angle mode. Must be "DEG" or "RAD"');
            }
        }

        // Validate theme
        if (updates.theme !== undefined) {
            if (updates.theme !== 'light' && updates.theme !== 'dark') {
                throw new Error('Invalid theme. Must be "light" or "dark"');
            }
        }

        // Validate mode
        if (updates.mode !== undefined) {
            if (updates.mode !== 'calculator' && updates.mode !== 'converter') {
                throw new Error('Invalid mode. Must be "calculator" or "converter"');
            }
        }
    }

    /**
     * Notify all subscribers of state change
     * @private
     */
    _notifySubscribers() {
        const currentState = this.getState();
        this.subscribers.forEach(callback => {
            try {
                callback(currentState);
            } catch (error) {
                console.error('Error in state subscriber:', error);
            }
        });
    }
}
