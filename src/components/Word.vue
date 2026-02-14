<script setup lang="ts">
import axios from 'axios';
import { generate } from "random-words";
import { onMounted, ref } from 'vue';

const word = ref<string>('');
const definition = ref<string>('');
const hiddenWord = ref<string>('');

/**
 * Permette di nascondere parti della parola
 * @param word la parola selezionata da nascondere
 * @returns {string[]} Un array di caratteri (es: ['a', '_', '_', 'e']).
 */
function hideRandomLetters(word: string) {
    let wordArray: string[] = word.split('');
    let numToHide: number = 0
    let hiddenCount = 0;

    if (word.length <= 4) {
        numToHide = 3
    } else if (word.length > 4 && word.length <= 8) {
        numToHide = 5
    }

    while (hiddenCount < numToHide && hiddenCount < word.length) {
        let randomIndex = Math.floor(Math.random() * wordArray.length);

        if (wordArray[randomIndex] !== '_') {
            wordArray.splice(randomIndex, 1, '_');
            hiddenCount++;
        }
    }

    return wordArray.join('');
}

/**
 * Chiamata api che prende la definizione dal dizionario in base alla parola generata casualmente tramite il pacchetto random-words
 */
function getApi() {
    const newWord = generate() as string;
    word.value = newWord;
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`;

    hiddenWord.value = hideRandomLetters(newWord);

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
        <p>{{ hiddenWord }}</p>
        <p>{{ definition }}</p>
        <button @click="getApi">Generate definition</button>
    </section>
</template>

<style></style>