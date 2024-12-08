// src/services/dataService.js

export const fetchQuizData = async (list) => {
    const response = await fetch(`/data/budowa_architektury_bezpieczenstwa_it_lista_${list}.json`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};
