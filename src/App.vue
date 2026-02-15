<script setup lang="ts">
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';
import Word from './components/Word.vue';
import Footer from './components/Footer.vue';
import { onMounted } from 'vue';
import { useStyleStore } from './stores/styleStore';

const styleStore = useStyleStore();

onMounted(() => {
  styleStore.applyTheme();
});
</script>

<template>
  <Header />
  <Menu />
  <Word />
  <Footer />
</template>

<style scoped></style>
