<script setup lang="ts">
import axios from 'axios';
import { generate } from "random-words";
import { onMounted, ref } from 'vue';
import { useMenuStore } from '../stores/menuStore';

const menuStore = useMenuStore();
const word = ref<string>('');
const definition = ref<string>('');
const hiddenWord = ref<string>('');
const answer = ref<string>('');
const point = ref<number>(0);
let firstApi = true;

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
    } else if (word.length > 8 && word.length <= 12) {
        numToHide = 6
    } else {
        numToHide = 9
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
    if (menuStore.attemps === 0) {
        return;
    }

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

            if (firstApi === false) {
                menuStore.attemps--
            } else {
                firstApi = false;
                return;
            }
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
        getApi();
        point.value++;
    } else {
        if (point.value === 0) {
            point.value = 0
        } else {
            point.value--;
        }

    }

    answer.value = '';
}

/**
 * Una funzione che permette di resettare tutti i dati come se si facesse un reload della pagina.
 */
function playAgain() {
    word.value = '';
    definition.value = '';
    hiddenWord.value = '';
    answer.value = '';
    point.value = 0;
    menuStore.attemps = 10;

    getApi();
}

onMounted(() => {
    getApi();
});
</script>

<template>
    <main class="word">
        <div class="pug-winner" v-show="point === 10">
            <img src="/src/assets/8c23bdf8.jpg" alt="pug winner">
            <p>You are truly the pug master</p>
            <button class="play-again" @click="playAgain">Play again</button>
        </div>
        <div class="gameover" v-show="menuStore.attemps === 0">
            <p>Points: {{ point }}</p>
            <button class="play-again" @click="playAgain">Play again</button>
        </div>
        <div :class="menuStore.attemps > 0 || point === 9 ? 'gameon' : 'gameon gameover-overlay'">
            <div class="word__gameData">
                <p>Attempts left: {{ menuStore.attemps }}</p>
                <p>|</p>
                <p class="word__points">Points: {{ point }}</p>
            </div>
            <div class="word__container">
                <p class="hidden-word">{{ hiddenWord }}</p>
                <p class="word-definition">{{ definition }}</p>
                <div class="word__answer">
                    <input type="text" placeholder="Word" v-model="answer" @keyup.enter="checkAnswer(answer)">
                    <button class="word__button-submit" @click="checkAnswer(answer)">Submit</button>
                </div>
                <button class="word__new-definition pointer" @click="getApi">Generate new definition</button>
            </div>
        </div>
    </main>

</template>

<style></style>