// src/components/Study/StudyResults.js

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Exam/Exam.module.css';

const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    return `${hours}h ${minutes}m ${seconds}s`;
};

const StudyResults = ({ learnedQuestionsCount, totalQuestions, totalTime, handleRestart, handleReturnToHome, listId }) => {
    return (
        <div className={styles.quizContainer}>
            <h2>Wszystkie pytania zostały nauczone!</h2>
            <p>Lista: {listId}</p>
            <p>Nauczyłeś się {learnedQuestionsCount} z {totalQuestions} pytań.</p>
            <p>Całkowity czas nauki: {formatTime(totalTime)}</p>
            <button className={styles.quizButton} onClick={handleRestart}>Spróbuj ponownie</button>
            <button className={styles.quizButton} onClick={handleReturnToHome}>Wróć do strony głównej</button>
        </div>
    );
};

StudyResults.propTypes = {
    learnedQuestionsCount: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    totalTime: PropTypes.number.isRequired,
    handleRestart: PropTypes.func.isRequired,
    handleReturnToHome: PropTypes.func.isRequired,
    listId: PropTypes.string.isRequired,
};

export default StudyResults;
