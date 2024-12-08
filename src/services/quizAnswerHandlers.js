// src/services/quizAnswerHandlers.js

import { arraysEqual } from './quizArrayUtilities';

/**
 * Aktualizuje zaznaczone odpowiedzi użytkownika.
 * @param {Array} prevSelectedAnswers - Poprzednie zaznaczone odpowiedzi.
 * @param {number} index - Indeks zaznaczonej odpowiedzi.
 * @returns {Array} - Zaktualizowane zaznaczone odpowiedzi.
 */
export const updateSelectedAnswers = (prevSelectedAnswers, index) => {
    if (prevSelectedAnswers.includes(index)) {
        return prevSelectedAnswers.filter(answer => answer !== index);
    } else {
        return [...prevSelectedAnswers, index];
    }
};

/**
 * Sprawdza, czy odpowiedzi użytkownika są poprawne.
 * @param {Array} selectedAnswers - Zaznaczone odpowiedzi użytkownika.
 * @param {Array} shuffledAnswers - Wymieszane odpowiedzi.
 * @param {Array} correctAnswers - Poprawne odpowiedzi.
 * @returns {boolean} - True, jeśli odpowiedzi są poprawne, w przeciwnym razie false.
 */
export const checkIfCorrect = (selectedAnswers, shuffledAnswers, correctAnswers) => {
    const selectedShuffledIndexes = selectedAnswers.map(index => shuffledAnswers[index].index);
    return arraysEqual(selectedShuffledIndexes.sort(), correctAnswers.sort());
};

/**
 * Przetwarza odpowiedzi użytkownika po kliknięciu przycisku "Sprawdź odpowiedź".
 * @param {Object} question - Obiekt pytania.
 * @param {Array} selectedAnswers - Zaznaczone odpowiedzi użytkownika.
 * @param {Array} shuffledAnswers - Wymieszane odpowiedzi.
 * @returns {Object} - Obiekt zawierający wynik sprawdzenia odpowiedzi.
 */
export const handleCheckAnswer = (question, selectedAnswers, shuffledAnswers) => {
    const correctAnswers = question.correct_answers.map(ans => ans - 1);
    const isCorrect = checkIfCorrect(selectedAnswers, shuffledAnswers, correctAnswers);

    return {
        isCorrect,
        correctAnswers,
        selectedAnswers: selectedAnswers.map(index => shuffledAnswers[index].index)
    };
};

/**
 * Przetwarza odpowiedzi użytkownika po kliknięciu przycisku "Next".
 * @param {Object} question - Obiekt pytania.
 * @param {Array} selectedAnswers - Zaznaczone odpowiedzi użytkownika.
 * @param {Array} shuffledAnswers - Wymieszane odpowiedzi.
 * @param {Function} setScore - Funkcja do ustawienia wyniku.
 * @param {Function} setIncorrectQuestions - Funkcja do ustawienia niepoprawnych pytań.
 * @returns {boolean} - True, jeśli odpowiedzi są poprawne, w przeciwnym razie false.
 */
export const handleNextQuestion = (question, selectedAnswers, shuffledAnswers, setScore, setIncorrectQuestions) => {
    const correctAnswers = question.correct_answers.map(ans => ans - 1);
    const isCorrect = checkIfCorrect(selectedAnswers, shuffledAnswers, correctAnswers);

    if (isCorrect) {
        setScore(prevScore => prevScore + 1);
    } else {
        setIncorrectQuestions(prevIncorrectQuestions => [
            ...prevIncorrectQuestions,
            { ...question, selectedAnswers: selectedAnswers.map(index => shuffledAnswers[index].index), shuffledAnswers }
        ]);
    }

    return isCorrect;
};
