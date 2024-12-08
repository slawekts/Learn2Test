// src/components/ModeToggle/ModeToggle.js

import React from 'react';

const ModeToggle = ({ isLearningMode, toggleMode }) => {
    return (
        <div>
            <button onClick={toggleMode}>
                {isLearningMode ? 'Przełącz na tryb Testu' : 'Przełącz na tryb Nauki'}
            </button>
            <p>Aktualny tryb: {isLearningMode ? 'Nauka' : 'Test'}</p>
        </div>
    );
};

export default ModeToggle;
