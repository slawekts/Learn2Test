// src/components/Study/Study.js

import React, { useState, useEffect, useCallback } from 'react';
import { fetchQuizData } from '../../services/dataService';
import Question from '../Shared/Question';
import Feedback from '../Shared/Feedback';
import StudyResults from './StudyResults';
import styles from '../Exam/Exam.module.css';
import { shuffleAnswers } from '../../services/quizArrayUtilities';
import { updateSelectedAnswers, handleCheckAnswer } from '../../services/quizAnswerHandlers';

const Study = ({ listId }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [learnedQuestions, setLearnedQuestions] = useState([]);
    const [unlearnedQuestions, setUnlearnedQuestions] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [shuffleEnabled, setShuffleEnabled] = useState(false);
    const [startTime] = useState(Date.now());
    const [totalTime, setTotalTime] = useState(0);

    const shuffleCurrentAnswers = useCallback((answers) => {
        const shuffled = shuffleAnswers(answers, shuffleEnabled);
        setShuffledAnswers(shuffled);
    }, [shuffleEnabled]);

    useEffect(() => {
        fetchQuizData(listId)
            .then(data => {
                setQuestions(data);
                setUnlearnedQuestions(data);
                shuffleCurrentAnswers(data[0].answers);
            })
            .catch(error => console.error(error));
    }, [listId, shuffleCurrentAnswers]);

    useEffect(() => {
        if (unlearnedQuestions.length > 0 && currentQuestionIndex < unlearnedQuestions.length) {
            shuffleCurrentAnswers(unlearnedQuestions[currentQuestionIndex].answers);
        }
    }, [shuffleEnabled, unlearnedQuestions, currentQuestionIndex, shuffleCurrentAnswers]);

    const handleAnswerSelection = (index) => {
        setSelectedAnswers(prevSelectedAnswers => updateSelectedAnswers(prevSelectedAnswers, index));
    };

    const handleCheckAnswerClick = () => {
        const feedback = handleCheckAnswer(unlearnedQuestions[currentQuestionIndex], selectedAnswers, shuffledAnswers);
        setFeedback(feedback);
        setIsFeedbackVisible(true);
    };

    const handleNextQuestionClick = () => {
        const currentQuestion = unlearnedQuestions[currentQuestionIndex];
        const correctAnswers = currentQuestion.correct_answers.map(ans => ans - 1);
        const selectedShuffledIndexes = selectedAnswers.map(index => shuffledAnswers[index].index);
        const isCorrect = selectedShuffledIndexes.sort().toString() === correctAnswers.sort().toString();

        if (isCorrect) {
            setLearnedQuestions(prev => [...prev, currentQuestion]);
            setUnlearnedQuestions(prev => prev.filter((_, i) => i !== currentQuestionIndex));
            if (currentQuestionIndex >= unlearnedQuestions.length - 1) {
                setCurrentQuestionIndex(0);
            } else {
                setCurrentQuestionIndex(prev => prev % unlearnedQuestions.length);
            }
        } else {
            setCurrentQuestionIndex(prev => (prev + 1) % unlearnedQuestions.length);
        }

        setSelectedAnswers([]);
        setIsFeedbackVisible(false);
        setFeedback(null);
    };

    const handleRestart = () => {
        window.location.reload();
    };

    const handleReturnToHome = () => {
        window.location.href = '/';
    };

    useEffect(() => {
        if (unlearnedQuestions.length === 0) {
            setTotalTime(Date.now() - startTime);
        }
    }, [unlearnedQuestions, startTime]);

    if (unlearnedQuestions.length === 0) {
        return (
            <StudyResults
                learnedQuestionsCount={learnedQuestions.length}
                totalQuestions={questions.length}
                totalTime={totalTime}
                handleRestart={handleRestart}
                handleReturnToHome={handleReturnToHome}
                listId={listId}
            />
        );
    }

    const currentQuestion = unlearnedQuestions[currentQuestionIndex];

    return (
        <div className={styles.quizContainer}>
            <Question 
                question={currentQuestion.question}
                answers={shuffledAnswers.map(sa => sa.answer)}
                selectedAnswers={selectedAnswers}
                handleAnswerSelection={handleAnswerSelection}
            />
            <button className={styles.quizButton} onClick={handleCheckAnswerClick}>Sprawdź odpowiedź</button>
            <button className={styles.quizButton} onClick={handleNextQuestionClick}>Next</button>
            {isFeedbackVisible && <Feedback feedback={feedback} question={currentQuestion} />}
            <p className={styles.textElement}>Nauczyłeś się {learnedQuestions.length} z {questions.length} pytań</p>
            <p className={styles.textElement}>Pozostało do nauki: {unlearnedQuestions.length} pytań</p>
            <div className={styles.shuffleOption}>
                <label>
                    <input 
                        type="checkbox" 
                        checked={shuffleEnabled} 
                        onChange={() => setShuffleEnabled(!shuffleEnabled)}
                    />
                    Mieszaj kolejność odpowiedzi
                </label>
            </div>
        </div>
    );
};

export default Study;
