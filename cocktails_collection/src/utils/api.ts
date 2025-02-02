import { Cocktail } from "./types";

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const searchCocktailByName = async (name: string): Promise<Cocktail[]> => {
  const url = `${BASE_URL}/search.php?s=${name}`;
  const data = await fetchData<{ drinks: Cocktail[] }>(url);
  return data.drinks || [];
};

export const listCocktailsByFirstLetter = async (letter: string): Promise<Cocktail[]> => {
  const url = `${BASE_URL}/search.php?f=${letter}`;
  const data = await fetchData<{ drinks: Cocktail[] }>(url);
  return data.drinks || [];
};

export const lookupCocktailById = async (id: string): Promise<Cocktail | null> => {
  const url = `${BASE_URL}/lookup.php?i=${id}`;
  const data = await fetchData<{ drinks: Cocktail[] }>(url);
  return data.drinks ? data.drinks[0] : null;
};