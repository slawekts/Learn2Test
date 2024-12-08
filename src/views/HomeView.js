// src/views/HomeView.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModeToggle from '../components/ModeToggle/ModeToggle';

const Home = () => {
    const [isLearningMode, setIsLearningMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('learningMode') === 'true';
        setIsLearningMode(savedMode);
    }, []);

    const toggleMode = () => {
        setIsLearningMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('learningMode', newMode);
            return newMode;
        });
    };

    return (
        <div>
            <h1>Wybierz quiz</h1>
            <ModeToggle isLearningMode={isLearningMode} toggleMode={toggleMode} />
            <ul>
                {[1, 2, 3, 4, 5, 6, '7a', '7b'].map(list => (
                    <li key={list}>
                        <Link to={isLearningMode ? `/learn/${list}` : `/quiz/${list}`}>
                            Lista {list}
                        </Link>
                    </li>
                ))}
            </ul>
            <div>
                <Link to="/all-questions">
                    <button>Zobacz wszystkie pytania</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
