// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import ExamView from './views/ExamView';
import AllQuestionsView from './views/AllQuestionsView';
import StudyView from './views/StudyView';
import './assets/styles/App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/quiz/:listId" element={<ExamView />} />
                <Route path="/learn/:listId" element={<StudyView />} />
                <Route path="/all-questions" element={<AllQuestionsView />} />
            </Routes>
        </Router>
    );
}

export default App;
