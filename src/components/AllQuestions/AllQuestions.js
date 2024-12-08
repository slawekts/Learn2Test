// src/components/AllQuestions/AllQuestions.js

import React, { useState, useEffect } from 'react';
import { fetchQuizData } from '../../services/dataService';
import styles from './AllQuestions.module.css';

const AllQuestions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let allQuestions = [];
            const lists = ['1', '2', '3', '4', '5', '6', '7a', '7b'];
            for (const list of lists) {
                const data = await fetchQuizData(list);
                const numberedQuestions = data.map((question, index) => ({
                    ...question,
                    listNumber: list,
                    questionNumber: index + 1
                }));
                allQuestions = [...allQuestions, ...numberedQuestions];
            }
            setQuestions(allQuestions);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Wszystkie pytania</h1>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>
                        <h2>{question.listNumber}.{question.questionNumber} {question.question}</h2>
                        <ul>
                            {question.answers.map((answer, i) => (
                                <li key={i} className={question.correct_answers.includes(i + 1) ? styles.correctAnswer : styles.incorrectAnswer}>
                                    {answer}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllQuestions;
