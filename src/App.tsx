import React, { useState, useEffect } from 'react';
import WordSearch from './components/WordSearch';
import WordList from './components/WordList';
import { generateWordSearch } from './utils/wordSearchGenerator';
import { fetchWords } from './utils/wordFetcher';

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [grid, setGrid] = useState<string[][]>([]);
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [error, setError] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  useEffect(() => {
    fetchWords().then(setWords);
  }, []);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>, dimension: 'rows' | 'cols') => {
    const newSize = parseInt(e.target.value);
    if (isNaN(newSize)) {
      setError('Por favor, ingrese un número válido.');
    } else if (newSize < 5) {
      setError('El tamaño mínimo para cada dimensión es 5.');
    } else {
      if (dimension === 'rows') {
        setRows(newSize);
      } else {
        setCols(newSize);
      }
      setError('');
    }
  };

  const generatePuzzle = () => {
    const maxLength = Math.max(rows, cols);
    const filteredWords = words.filter(word => word.length <= maxLength);
    
    // Calcular el número de palabras basado en el tamaño del pupiletras
    const puzzleArea = rows * cols;
    const wordCount = Math.min(Math.max(5, Math.floor(puzzleArea / 25)), filteredWords.length);
    
    const selectedWords = filteredWords.slice(0, wordCount);
    
    if (selectedWords.length < 5) {
      setError('No hay suficientes palabras que quepan en el pupiletras. Intente de nuevo o aumente el tamaño.');
      return;
    }

    const { grid, placements } = generateWordSearch(selectedWords, rows, cols);
    setGrid(grid);
    setSelectedWords(placements.map(p => p.word));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Generador de Pupiletras</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="rows" className="block text-sm font-medium text-gray-700">
              Filas (mínimo 5):
            </label>
            <input
              type="number"
              id="rows"
              value={rows}
              onChange={(e) => handleSizeChange(e, 'rows')}
              min="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="cols" className="block text-sm font-medium text-gray-700">
              Columnas (mínimo 5):
            </label>
            <input
              type="number"
              id="cols"
              value={cols}
              onChange={(e) => handleSizeChange(e, 'cols')}
              min="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-1 mb-2">{error}</p>}
        <button
          onClick={generatePuzzle}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!!error}
        >
          Generar Pupiletras
        </button>
        <div className="mt-8 flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 pr-4">
            <WordSearch grid={grid} />
          </div>
          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            <WordList words={selectedWords} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;