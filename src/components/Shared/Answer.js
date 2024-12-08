// src/components/Shared/Answer.js

import React from 'react';
import styles from '../Exam/Exam.module.css';

const Answer = ({ answer, index, isSelected, handleAnswerSelection }) => (
    <li className={styles.answer}>
        <label>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleAnswerSelection(index)}
            />
            {answer}
        </label>
    </li>
);

export default Answer;
