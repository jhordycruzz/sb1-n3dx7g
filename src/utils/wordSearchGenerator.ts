interface WordPlacement {
  word: string;
  row: number;
  col: number;
  direction: [number, number];
}

export function generateWordSearch(words: string[], rows: number, cols: number): { grid: string[][], placements: WordPlacement[] } {
  const grid: string[][] = Array(rows).fill(null).map(() => Array(cols).fill(''));
  const placements: WordPlacement[] = [];
  const directions: [number, number][] = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal down-right
    [-1, 1],  // diagonal up-right
  ];

  // Ordenar las palabras de la más larga a la más corta
  words.sort((a, b) => b.length - a.length);

  for (const word of words) {
    if (word.length > Math.max(rows, cols)) continue; // Skip words that are too long

    let placed = false;
    for (let attempts = 0; attempts < 100 && !placed; attempts++) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);

      if (canPlaceWord(grid, word, row, col, direction)) {
        placeWord(grid, word, row, col, direction);
        placements.push({ word, row, col, direction });
        placed = true;
      }
    }
    if (!placed) {
      console.warn(`Could not place word: ${word}`);
    }
  }

  fillEmptySpaces(grid);

  return { grid, placements };
}

function canPlaceWord(grid: string[][], word: string, row: number, col: number, [dx, dy]: [number, number]): boolean {
  if (row + dx * (word.length - 1) < 0 || row + dx * (word.length - 1) >= grid.length) return false;
  if (col + dy * (word.length - 1) < 0 || col + dy * (word.length - 1) >= grid[0].length) return false;

  for (let i = 0; i < word.length; i++) {
    const currentRow = row + dx * i;
    const currentCol = col + dy * i;
    if (grid[currentRow][currentCol] !== '' && grid[currentRow][currentCol] !== word[i]) {
      return false;
    }
  }

  return true;
}

function placeWord(grid: string[][], word: string, row: number, col: number, [dx, dy]: [number, number]): void {
  for (let i = 0; i < word.length; i++) {
    grid[row + dx * i][col + dy * i] = word[i];
  }
}

function fillEmptySpaces(grid: string[][]): void {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }
}