// src/components/Exam/Exam.js

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizData } from '../../services/dataService';
import Question from '../Shared/Question';
import Feedback from '../Shared/Feedback';
import ExamResults from './ExamResults';
import styles from './Exam.module.css';
import { shuffleAnswers } from '../../services/quizArrayUtilities';
import { updateSelectedAnswers, handleCheckAnswer, handleNextQuestion } from '../../services/quizAnswerHandlers';

const Exam = ({ listId }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [shuffleEnabled, setShuffleEnabled] = useState(false);
    const navigate = useNavigate();

    const shuffleCurrentAnswers = useCallback((answers, correctAnswers) => {
        const shuffled = shuffleAnswers(answers, shuffleEnabled);
        setShuffledAnswers(shuffled);
    }, [shuffleEnabled]);

    useEffect(() => {
        fetchQuizData(listId)
            .then(data => {
                setQuestions(data);
                shuffleCurrentAnswers(data[0].answers, data[0].correct_answers);
            })
            .catch(error => console.error(error));
    }, [listId, shuffleCurrentAnswers]);

    useEffect(() => {
        if (questions.length > 0) {
            shuffleCurrentAnswers(questions[currentQuestionIndex].answers, questions[currentQuestionIndex].correct_answers);
        }
    }, [shuffleEnabled, questions, currentQuestionIndex, shuffleCurrentAnswers]);

    const handleAnswerSelection = (index) => {
        setSelectedAnswers(prevSelectedAnswers => updateSelectedAnswers(prevSelectedAnswers, index));
    };

    const handleCheckAnswerClick = () => {
        const feedback = handleCheckAnswer(questions[currentQuestionIndex], selectedAnswers, shuffledAnswers);
        setFeedback(feedback);
        setIsFeedbackVisible(true);
    };

    const handleNextQuestionClick = () => {
        handleNextQuestion(questions[currentQuestionIndex], selectedAnswers, shuffledAnswers, setScore, setIncorrectQuestions);
        setIsFeedbackVisible(false);

        if (currentQuestionIndex + 1 < questions.length) {
            const nextQuestionIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedAnswers([]);
            setFeedback(null);
            shuffleCurrentAnswers(questions[nextQuestionIndex].answers, questions[nextQuestionIndex].correct_answers);
        } else {
            setShowResult(true);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers([]);
        setScore(0);
        setShowResult(false);
        setFeedback(null);
        setIsFeedbackVisible(false);
        setIncorrectQuestions([]);
        shuffleCurrentAnswers(questions[0].answers, questions[0].correct_answers);
    };

    const handleReturnToHome = () => {
        navigate('/');
    };

    const toggleShuffle = () => {
        setShuffleEnabled(!shuffleEnabled);
    };

    if (showResult) {
        return (
            <ExamResults
                score={score}
                totalQuestions={questions.length}
                incorrectQuestions={incorrectQuestions}
                handleRestartQuiz={handleRestartQuiz}
                handleReturnToHome={handleReturnToHome}
                listId={listId}
            />
        );
    }

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const question = questions[currentQuestionIndex];

    return (
        <div className={styles.quizContainer}>
            <Question 
                question={question.question}
                answers={shuffledAnswers.map(sa => sa.answer)}
                selectedAnswers={selectedAnswers}
                handleAnswerSelection={handleAnswerSelection}
            />
            <button className={styles.quizButton} onClick={handleCheckAnswerClick}>Sprawdź odpowiedź</button>
            <button className={styles.quizButton} onClick={handleNextQuestionClick}>Next</button>
            {isFeedbackVisible && <Feedback feedback={feedback} question={question} />}
            <p className={styles.textElement}>Aktualny wynik: {score}</p>
            <p className={styles.textElement}>Pytanie {currentQuestionIndex + 1} z {questions.length}</p>
            <div className={styles.shuffleOption}>
                <label>
                    <input 
                        type="checkbox" 
                        checked={shuffleEnabled} 
                        onChange={toggleShuffle}
                    />
                    Mieszaj kolejność odpowiedzi
                </label>
            </div>
        </div>
    );
};

export default Exam;
