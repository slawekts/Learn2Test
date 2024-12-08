// src/components/Shared/IncorrectQuestions.js

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Exam/ExamResults.module.css';

const IncorrectQuestions = ({ incorrectQuestions }) => (
    <div className={styles.incorrectQuestionsSection}>
        <h2>Pytania z błędnymi odpowiedziami:</h2>
        {incorrectQuestions.map((q, index) => (
            <div key={index} className={styles.incorrectQuestion}>
                <h3>{q.question}</h3>
                <ul>
                    {q.shuffledAnswers.map((answer, i) => (
                        <li key={i} className={q.correct_answers.includes(answer.index + 1) ? styles.correctAnswer : styles.incorrectAnswer}>
                            {answer.answer}
                        </li>
                    ))}
                </ul>
                <p>Twoje odpowiedzi:</p>
                <ul>
                    {q.selectedAnswers.map((answerIndex, i) => (
                        <li key={i}>{q.shuffledAnswers.find(a => a.index === answerIndex).answer}</li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);

IncorrectQuestions.propTypes = {
    incorrectQuestions: PropTypes.array.isRequired,
};

export default IncorrectQuestions;
