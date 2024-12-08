// src/components/Shared/Feedback.js

import React from 'react';
import styles from '../Exam/Exam.module.css';

const Feedback = ({ feedback, question }) => {
    return (
        <div>
            {feedback.isCorrect ? (
                <p className={styles.correctAnswer}>Poprawna odpowiedź!</p>
            ) : (
                <div>
                    <p className={styles.incorrectAnswer}>Niepoprawna odpowiedź. Poprawne odpowiedzi to:</p>
                    <ul>
                        {question.answers.map((answer, index) => (
                            feedback.correctAnswers.includes(index) && (
                                <li key={index}>{answer}</li>
                            )
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Feedback;
