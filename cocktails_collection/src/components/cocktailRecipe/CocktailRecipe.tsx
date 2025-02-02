import { Cocktail } from "../../utils/types";

import "./CocktailRecipe.styles.scss";

interface CocktailRecipeProps {
    cocktail: Cocktail;
}

export default function CocktailRecipe({ cocktail }: CocktailRecipeProps) {
    return (
        <div className="cocktailCard">
            <h2>{cocktail.strDrink}</h2>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktailImage" />
            <p><strong>Category:</strong> {cocktail.strCategory}</p>
            <p><strong>Alcoholic:</strong> {cocktail.strAlcoholic}</p>
            <p><strong>Glass:</strong> {cocktail.strGlass}</p>
            <h3>Ingredients:</h3>
            <ul>
                {Array.from({ length: 15 }, (_, i) => i + 1)
                    .map(i => ({
                        ingredient: cocktail[`strIngredient${i}` as keyof
                            Cocktail],
                        measure: cocktail[`strMeasure${i}` as keyof Cocktail],
                    }))
                    .filter(item => item.ingredient)
                    .map((item, index) => (
                        <li key={index}>{item.measure} {item.ingredient}</li>
                    ))
                }
            </ul>
            <h3>Instructions:</h3>
            <p>{cocktail.strInstructions}</p>
        </div>
    );
}