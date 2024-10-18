import React from 'react';

interface WordListProps {
  words: string[];
}

const WordList: React.FC<WordListProps> = ({ words }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Palabras a encontrar:</h2>
      <ul className="list-disc pl-5">
        {words.map((word, index) => (
          <li key={index} className="mb-1">
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;