
import DEFAULT_IMAGE_URL from "../images/default_cocktail.png";
import { AlcoholicStatus, Cocktail } from "../utils/types";

export function useCreateCocktail(
    name: string,
    ingredients: string,
    instructions: string,
    alcoholicStatus: AlcoholicStatus,
    category: string,
    image: string| null
): Cocktail {
    const newCocktail: Cocktail = {
        dateModified: new Date().toISOString(),
        idDrink: Math.random().toString(36).slice(2, 11),
        strAlcoholic: alcoholicStatus,
        strCategory: category,
        strCreativeCommonsConfirmed: "Yes",
        strDrink: name,
        strDrinkAlternate: null,
        strDrinkThumb: image || DEFAULT_IMAGE_URL,
        strGlass: "Cocktail glass",
        strIBA: null,
        strImageAttribution: null,
        strImageSource: null,
        strIngredient1: ingredients.split(",")[0] || null,
        strIngredient2: ingredients.split(",")[1] || null,
        strIngredient3: ingredients.split(",")[2] || null,
        strIngredient4: ingredients.split(",")[3] || null,
        strIngredient5: ingredients.split(",")[4] || null,
        strIngredient6: ingredients.split(",")[5] || null,
        strIngredient7: ingredients.split(",")[6] || null,
        strIngredient8: ingredients.split(",")[7] || null,
        strIngredient9: ingredients.split(",")[8] || null,
        strIngredient10: ingredients.split(",")[9] || null,
        strIngredient11: ingredients.split(",")[10] || null,
        strIngredient12: ingredients.split(",")[11] || null,
        strIngredient13: ingredients.split(",")[12] || null,
        strIngredient14: ingredients.split(",")[13] || null,
        strIngredient15: ingredients.split(",")[14] || null,
        strInstructions: instructions,
        strInstructionsDE: null,
        strInstructionsES: null,
        strInstructionsFR: null,
        strInstructionsIT: null,
        strInstructionsZH_HANS: null,
        strInstructionsZH_HANT: null,
        strMeasure1: null,
        strMeasure2: null,
        strMeasure3: null,
        strMeasure4: null,
        strMeasure5: null,
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strTags: null,
        strVideo: null,
    };

    return newCocktail;
}
