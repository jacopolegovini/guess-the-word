<script setup lang="ts">
import { useMenuStore } from '../stores/menuStore';

const menuStore = useMenuStore();
</script>

<template>
    <header class="header">
        <div class="menu-lines" @click="menuStore.toggleMenu">
            <div class="menu-line"></div>
            <div class="menu-line"></div>
            <div class="menu-line"></div>
        </div>
        <h1>Guess the word</h1>
    </header>
</template>

<style></style>