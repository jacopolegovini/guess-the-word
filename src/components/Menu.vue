<script setup lang="ts">
import { useMenuStore } from '../stores/menuStore';

const menuStore = useMenuStore();
</script>

<template>
    <div :class="menuStore.isMenuOpen ? 'menu menu-open' : 'menu'">
        <button class="menu-close" @click="menuStore.toggleMenu">&times;</button>
        <div class="menu-attemps">
            <p>Attemps:</p>
            <input type="number" min="1" max="20" value="1">
        </div>
    </div>
</template>

<style></style>