// src/services/quizArrayUtilities.js

/**
 * Miesza elementy tablicy.
 * @param {Array} array - Tablica do wymieszania.
 * @returns {Array} - Wymieszana tablica.
 */
export const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

/**
 * Sprawdza, czy dwie tablice są równe.
 * @param {Array} arr1 - Pierwsza tablica.
 * @param {Array} arr2 - Druga tablica.
 * @returns {boolean} - True, jeśli tablice są równe, w przeciwnym razie false.
 */
export const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};

/**
 * Miesza odpowiedzi w zależności od flagi shuffleEnabled.
 * @param {Array} answers - Tablica odpowiedzi.
 * @param {boolean} shuffleEnabled - Flaga określająca, czy mieszanie jest włączone.
 * @returns {Array} - Tablica odpowiedzi, być może wymieszana.
 */
export const shuffleAnswers = (answers, shuffleEnabled) => {
    return shuffleEnabled ? shuffleArray(answers.map((answer, index) => ({ answer, index }))) : answers.map((answer, index) => ({ answer, index }));
};
