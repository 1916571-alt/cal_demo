import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StateManager } from '../../../src/core/StateManager.js';

/**
 * StateManager Test Suite
 * 
 * Tests the state management system that handles application state,
 * subscriptions, and persistence.
 */

describe('StateManager', () => {
    let stateManager;

    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        stateManager = new StateManager();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('Initialization', () => {
        it('should initialize with default state', () => {
            const state = stateManager.getState();
            expect(state.currentValue).toBe('');
            expect(state.previousEquation).toBe('');
            expect(state.angleMode).toBe('DEG');
            expect(state.theme).toBe('dark');
            expect(state.mode).toBe('calculator');
            expect(state.history).toEqual([]);
        });

        it('should load state from localStorage if available', () => {
            // Set up localStorage
            const savedState = {
                angleMode: 'RAD',
                theme: 'light',
                history: [{ equation: '2+2', result: '4' }]
            };
            localStorage.setItem('calculator-state', JSON.stringify(savedState));

            // Create new state manager
            const sm = new StateManager();
            const state = sm.getState();

            expect(state.angleMode).toBe('RAD');
            expect(state.theme).toBe('light');
            expect(state.history).toEqual([{ equation: '2+2', result: '4' }]);
        });
    });

    describe('State Updates', () => {
        it('should update currentValue', () => {
            stateManager.updateState({ currentValue: '123' });
            expect(stateManager.getState().currentValue).toBe('123');
        });

        it('should update previousEquation', () => {
            stateManager.updateState({ previousEquation: '2+2' });
            expect(stateManager.getState().previousEquation).toBe('2+2');
        });

        it('should update angleMode', () => {
            stateManager.updateState({ angleMode: 'RAD' });
            expect(stateManager.getState().angleMode).toBe('RAD');
        });

        it('should update theme', () => {
            stateManager.updateState({ theme: 'light' });
            expect(stateManager.getState().theme).toBe('light');
        });

        it('should update mode', () => {
            stateManager.updateState({ mode: 'converter' });
            expect(stateManager.getState().mode).toBe('converter');
        });

        it('should update multiple properties at once', () => {
            stateManager.updateState({
                currentValue: '456',
                angleMode: 'RAD',
                theme: 'light'
            });

            const state = stateManager.getState();
            expect(state.currentValue).toBe('456');
            expect(state.angleMode).toBe('RAD');
            expect(state.theme).toBe('light');
        });

        it('should maintain immutability - not modify original state object', () => {
            const originalState = stateManager.getState();
            stateManager.updateState({ currentValue: '999' });
            expect(originalState.currentValue).toBe('');
        });
    });

    describe('History Management', () => {
        it('should add calculation to history', () => {
            stateManager.addToHistory('2+2', '4');
            const history = stateManager.getState().history;

            expect(history).toHaveLength(1);
            expect(history[0].equation).toBe('2+2');
            expect(history[0].result).toBe('4');
            expect(history[0].timestamp).toBeDefined();
        });

        it('should add multiple calculations to history', () => {
            stateManager.addToHistory('2+2', '4');
            stateManager.addToHistory('3*3', '9');

            const history = stateManager.getState().history;
            expect(history).toHaveLength(2);
            expect(history[1].equation).toBe('3*3');
        });

        it('should limit history to maximum size', () => {
            // Add more than max history items
            for (let i = 0; i < 150; i++) {
                stateManager.addToHistory(`${i}+${i}`, `${i * 2}`);
            }

            const history = stateManager.getState().history;
            expect(history.length).toBeLessThanOrEqual(100);
        });

        it('should keep most recent items when history is full', () => {
            for (let i = 0; i < 150; i++) {
                stateManager.addToHistory(`${i}+${i}`, `${i * 2}`);
            }

            const history = stateManager.getState().history;
            const lastItem = history[history.length - 1];
            expect(lastItem.equation).toBe('149+149');
        });

        it('should clear history', () => {
            stateManager.addToHistory('2+2', '4');
            stateManager.addToHistory('3*3', '9');
            stateManager.clearHistory();

            expect(stateManager.getState().history).toEqual([]);
        });
    });

    describe('Observer Pattern (Subscriptions)', () => {
        it('should notify subscribers when state changes', () => {
            const callback = vi.fn();
            stateManager.subscribe(callback);

            stateManager.updateState({ currentValue: '123' });

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(expect.objectContaining({
                currentValue: '123'
            }));
        });

        it('should notify multiple subscribers', () => {
            const callback1 = vi.fn();
            const callback2 = vi.fn();

            stateManager.subscribe(callback1);
            stateManager.subscribe(callback2);

            stateManager.updateState({ currentValue: '456' });

            expect(callback1).toHaveBeenCalledTimes(1);
            expect(callback2).toHaveBeenCalledTimes(1);
        });

        it('should allow unsubscribing', () => {
            const callback = vi.fn();
            const unsubscribe = stateManager.subscribe(callback);

            stateManager.updateState({ currentValue: '123' });
            expect(callback).toHaveBeenCalledTimes(1);

            unsubscribe();
            stateManager.updateState({ currentValue: '456' });
            expect(callback).toHaveBeenCalledTimes(1); // Still 1, not called again
        });

        it('should handle multiple unsubscribes safely', () => {
            const callback = vi.fn();
            const unsubscribe = stateManager.subscribe(callback);

            unsubscribe();
            unsubscribe(); // Should not throw error

            stateManager.updateState({ currentValue: '123' });
            expect(callback).not.toHaveBeenCalled();
        });

        it('should not notify after all subscribers unsubscribe', () => {
            const callback1 = vi.fn();
            const callback2 = vi.fn();

            const unsub1 = stateManager.subscribe(callback1);
            const unsub2 = stateManager.subscribe(callback2);

            unsub1();
            unsub2();

            stateManager.updateState({ currentValue: '789' });

            expect(callback1).not.toHaveBeenCalled();
            expect(callback2).not.toHaveBeenCalled();
        });
    });

    describe('LocalStorage Persistence', () => {
        it('should save state to localStorage on update', () => {
            stateManager.updateState({ angleMode: 'RAD', theme: 'light' });

            const saved = JSON.parse(localStorage.getItem('calculator-state'));
            expect(saved.angleMode).toBe('RAD');
            expect(saved.theme).toBe('light');
        });

        it('should not save currentValue to localStorage', () => {
            stateManager.updateState({ currentValue: '123' });

            const saved = JSON.parse(localStorage.getItem('calculator-state'));
            expect(saved.currentValue).toBeUndefined();
        });

        it('should not save previousEquation to localStorage', () => {
            stateManager.updateState({ previousEquation: '2+2' });

            const saved = JSON.parse(localStorage.getItem('calculator-state'));
            expect(saved.previousEquation).toBeUndefined();
        });

        it('should save history to localStorage', () => {
            stateManager.addToHistory('2+2', '4');

            const saved = JSON.parse(localStorage.getItem('calculator-state'));
            expect(saved.history).toHaveLength(1);
            expect(saved.history[0].equation).toBe('2+2');
        });

        it('should handle localStorage errors gracefully', () => {
            // Mock localStorage to throw error
            const originalSetItem = localStorage.setItem;
            localStorage.setItem = vi.fn(() => {
                throw new Error('QuotaExceededError');
            });

            // Should not throw
            expect(() => {
                stateManager.updateState({ angleMode: 'RAD' });
            }).not.toThrow();

            // Restore
            localStorage.setItem = originalSetItem;
        });
    });

    describe('Reset Functionality', () => {
        it('should reset to default state', () => {
            // Modify state
            stateManager.updateState({
                currentValue: '123',
                previousEquation: '2+2',
                angleMode: 'RAD',
                theme: 'light',
                mode: 'converter'
            });
            stateManager.addToHistory('2+2', '4');

            // Reset
            stateManager.reset();

            const state = stateManager.getState();
            expect(state.currentValue).toBe('');
            expect(state.previousEquation).toBe('');
            expect(state.angleMode).toBe('DEG');
            expect(state.theme).toBe('dark');
            expect(state.mode).toBe('calculator');
            expect(state.history).toEqual([]);
        });

        it('should clear localStorage on reset', () => {
            stateManager.updateState({ angleMode: 'RAD' });
            stateManager.reset();

            const saved = localStorage.getItem('calculator-state');
            expect(saved).toBeNull();
        });

        it('should notify subscribers on reset', () => {
            const callback = vi.fn();
            stateManager.subscribe(callback);

            stateManager.reset();

            expect(callback).toHaveBeenCalled();
        });
    });

    describe('Partial Reset', () => {
        it('should reset only calculation state', () => {
            stateManager.updateState({
                currentValue: '123',
                previousEquation: '2+2',
                angleMode: 'RAD',
                theme: 'light'
            });

            stateManager.resetCalculation();

            const state = stateManager.getState();
            expect(state.currentValue).toBe('');
            expect(state.previousEquation).toBe('');
            expect(state.angleMode).toBe('RAD'); // Preserved
            expect(state.theme).toBe('light'); // Preserved
        });
    });

    describe('State Validation', () => {
        it('should validate angleMode values', () => {
            expect(() => {
                stateManager.updateState({ angleMode: 'INVALID' });
            }).toThrow('Invalid angle mode');
        });

        it('should validate theme values', () => {
            expect(() => {
                stateManager.updateState({ theme: 'invalid' });
            }).toThrow('Invalid theme');
        });

        it('should validate mode values', () => {
            expect(() => {
                stateManager.updateState({ mode: 'invalid' });
            }).toThrow('Invalid mode');
        });

        it('should accept valid angleMode values', () => {
            expect(() => {
                stateManager.updateState({ angleMode: 'DEG' });
                stateManager.updateState({ angleMode: 'RAD' });
            }).not.toThrow();
        });

        it('should accept valid theme values', () => {
            expect(() => {
                stateManager.updateState({ theme: 'light' });
                stateManager.updateState({ theme: 'dark' });
            }).not.toThrow();
        });

        it('should accept valid mode values', () => {
            expect(() => {
                stateManager.updateState({ mode: 'calculator' });
                stateManager.updateState({ mode: 'converter' });
            }).not.toThrow();
        });
    });
});
