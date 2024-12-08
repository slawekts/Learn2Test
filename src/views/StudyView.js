// src/views/StudyView.js

import React from 'react';
import { useParams } from 'react-router-dom';
import Study from '../components/Study/Study';

const StudyView = () => {
    const { listId } = useParams();
    return <Study listId={listId} />;
};

export default StudyView;
