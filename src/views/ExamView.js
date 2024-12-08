// src/views/ExamView.js

import React from 'react';
import { useParams } from 'react-router-dom';
import Exam from '../components/Exam/Exam';

const ExamView = ({ learnMode = false }) => {
    const { listId } = useParams();
    return <Exam listId={listId} learnMode={learnMode} />;
};

export default ExamView;
