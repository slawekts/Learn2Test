// src/components/Shared/Question.js

import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';
import styles from '../Exam/Exam.module.css';

const Question = ({ question, answers, selectedAnswers, handleAnswerSelection }) => (
    <div className={styles.question}>
        <h2>{question}</h2>
        <ul className={styles.answers}>
            {answers.map((answer, index) => (
                <Answer
                    key={index}
                    answer={answer}
                    index={index}
                    isSelected={selectedAnswers.includes(index)}
                    handleAnswerSelection={handleAnswerSelection}
                />
            ))}
        </ul>
    </div>
);

Question.propTypes = {
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedAnswers: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleAnswerSelection: PropTypes.func.isRequired,
};

export default Question;
