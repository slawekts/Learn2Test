// src/components/Exam/ExamResults.js

import React from 'react';
import PropTypes from 'prop-types';
import IncorrectQuestions from '../Shared/IncorrectQuestions';
import styles from './ExamResults.module.css';

const ExamResults = ({ score, totalQuestions, incorrectQuestions, handleRestartQuiz, handleReturnToHome, listId }) => (
    <div className={styles.resultsContainer}>
        <h1>Quiz zakończony!</h1>
        <p>Lista: {listId}</p>
        <p className={styles.score}>Twój wynik: {score} / {totalQuestions}</p>
        {incorrectQuestions.length > 0 && (
            <div className={styles.incorrectQuestionsSection}>
                <IncorrectQuestions incorrectQuestions={incorrectQuestions} />
            </div>
        )}
        <button className={styles.resultsButton} onClick={handleRestartQuiz}>Spróbuj ponownie</button>
        <button className={styles.resultsButton} onClick={handleReturnToHome}>Wróć do strony głównej</button>
    </div>
);

ExamResults.propTypes = {
    score: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    incorrectQuestions: PropTypes.array.isRequired,
    handleRestartQuiz: PropTypes.func.isRequired,
    handleReturnToHome: PropTypes.func.isRequired,
    listId: PropTypes.string.isRequired,
};

export default ExamResults;
