<script setup lang="ts">
import axios from 'axios';
import { generate } from "random-words";
import { onMounted, ref } from 'vue';

const word = ref<string>('');
const definition = ref<string>('');

function getApi() {
    const newWord = generate() as string;
    word.value = newWord;
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`;

    axios.get(apiUrl)
        .then(response => {
            console.log(response.data);
            let definitionData: string = response.data[0].meanings[0].definitions[0].definition
            console.log(definition)
            definition.value = definitionData
        })
        .catch(error => {
            console.error(error);
        });
}

onMounted(() => {
    // getApi();
});
</script>

<template>
    <section class="word">
        <p>{{ word }}</p>
        <p>{{ definition }}</p>
        <button @click="getApi">Generate definition</button>
    </section>
</template>

<style></style>