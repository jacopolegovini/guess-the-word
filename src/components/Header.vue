<script setup lang="ts">
import { useMenuStore } from '../stores/menuStore';
import { useStyleStore } from '../stores/styleStore';

const menuStore = useMenuStore();
const styleStore = useStyleStore();
</script>

<template>
    <header class="header">
        <div class="menu-lines" @click="menuStore.toggleMenu">
            <div class="menu-line"></div>
            <div class="menu-line"></div>
            <div class="menu-line"></div>
        </div>
        <h1>Guess the word</h1>
        <button @click="styleStore.toggleTheme" class="theme-toggle-btn">
            {{ styleStore.theme === 'light' ? '🌙' : '☀️' }}
        </button>
    </header>
</template>

<style scoped></style>