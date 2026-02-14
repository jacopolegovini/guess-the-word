import { defineStore } from 'pinia';

interface FileState {
    isMenuOpen: boolean;
    attemps: number;
}

export const useMenuStore = defineStore('menu', {
    state: (): FileState => ({
        isMenuOpen: false,
        attemps: 10,
    }),
    actions: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
    },
});