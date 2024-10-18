import axios from 'axios';

export async function fetchWords(): Promise<string[]> {
  try {
    const response = await axios.get('https://es.wikipedia.org/api/rest_v1/page/random/summary');
    const content = response.data.extract;
    const words = content.split(/\s+/)
      .map((word: string) => word.replace(/[^a-zA-Z]/g, ''))
      .filter((word: string) => word.length >= 3 && word.length <= 15)
      .map((word: string) => word.toUpperCase())
      .filter((word: string, index: number, self: string[]) => self.indexOf(word) === index);
    
    // Asegurarse de tener suficientes palabras cortas
    const shortWords = words.filter(word => word.length <= 5);
    const longWords = words.filter(word => word.length > 5);
    
    // Combinar palabras cortas y largas, priorizando las cortas
    return [...shortWords, ...longWords].slice(0, 50);
  } catch (error) {
    console.error('Error fetching words:', error);
    return [];
  }
}