import { defineStore } from 'pinia';

interface FileState {
    isMenuOpen: boolean;
}

export const useMenuStore = defineStore('menu', {
    state: (): FileState => ({
        isMenuOpen: false,
    }),
    actions: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
    },
});