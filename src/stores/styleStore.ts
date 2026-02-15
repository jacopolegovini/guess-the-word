import { defineStore } from 'pinia';

export const useStyleStore = defineStore('style', {
    state: () => ({
        theme: localStorage.getItem('user-theme') || 'light'
    }),

    actions: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('user-theme', this.theme);
            this.applyTheme();
        },

        applyTheme() {
            document.documentElement.setAttribute('data-theme', this.theme);
        }
    }
});