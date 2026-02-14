<script setup lang="ts">
import axios from 'axios';
import { generate } from "random-words";
import { onMounted, ref } from 'vue';

const word = ref<string>('');
const definition = ref<string>('');
const hiddenWord = ref<string>('');
let answer = ref<string>('');

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
        numToHide = 4
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

    axios.get(apiUrl)
        .then(response => {
            console.log(response.data);
            let definitionData: string = response.data[0].meanings[0].definitions[0].definition
            console.log(definition)
            hiddenWord.value = hideRandomLetters(newWord);

            definition.value = definitionData
        })
        .catch(error => {
            console.error(error);
        });
}

/**
 * Questa funzione serve a controllare la risposta dello user e confrontarla con la parola generata randomicamente
 * @param userAnswer La risposta dello user
 */
function checkAnswer(userAnswer: string) {
    const cleanAnswer = userAnswer.toLowerCase().trim();

    if (cleanAnswer === word.value.toLowerCase()) {
        alert("Corretto!");
    } else {
        alert("Sbagliato!");
    }
}

onMounted(() => {
    // getApi();
});
</script>

<template>
    <section class="word">
        <p class="hidden-word">{{ hiddenWord }}</p>
        <p class="word-definition">{{ definition }}</p>
        <div class="word__answer">
            <input type="text" placeholder="Word" v-model="answer">
            <button @click="checkAnswer(answer)">Submit</button>
        </div>
        <button class="word__new-definition" @click="getApi">Generate new definition</button>
    </section>
</template>

<style></style>