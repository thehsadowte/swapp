import {Character} from '../types';

const BASE_URL = 'https://swapi.py4e.com/api';

export async function fetchCharacters(
  page: number,
): Promise<{characters: Character[]; total: number}> {
  const url = `${BASE_URL}/people/?page=${page}`;

  try {
    console.log('Fetching from URL:', url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log('Data fetched:', data);

    return {
      characters: data.results,
      total: data.count,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch characters:', error.message);
    } else {
      console.error('Failed to fetch characters:', error);
    }

    return {
      characters: [],
      total: 0,
    };
  }
}
