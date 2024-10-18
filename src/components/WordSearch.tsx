import React from 'react';

interface WordSearchProps {
  grid: string[][];
}

const WordSearch: React.FC<WordSearchProps> = ({ grid }) => {
  if (grid.length === 0) {
    return <div className="text-center text-gray-500">Genera un pupiletras para verlo aquí.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className="border border-gray-300 w-8 h-8 text-center font-mono uppercase"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordSearch;