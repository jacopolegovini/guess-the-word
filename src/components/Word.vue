<script setup lang="ts">
import axios from 'axios';
import { generate, count } from "random-words";
import { onMounted } from 'vue';

const word: string | string[] = generate();
const apiUrl: string = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

function getApi() {
    axios.get(apiUrl)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

onMounted(() => {
    getApi();
});
</script>

<template>
    <section class="word">
        <div>test</div>
    </section>
</template>

<style></style>