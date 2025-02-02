import { Cocktail } from "../../utils/types";

import CocktailItem from "./CocktailItem";

import "./CocktailsCollection.styles.scss";

interface CocktailsCollectionProps {
    cocktailsList: Cocktail[];
}

export default function CocktailsCollection({ cocktailsList }: CocktailsCollectionProps) {
    return (
        <div className="collectionWrapper">
            {cocktailsList.length ? (
                <div className="cocktailsGrid">
                    {cocktailsList.map((cocktail) => (
                        <CocktailItem
                            key={cocktail.idDrink}
                            id={cocktail.idDrink}
                            name={cocktail.strDrink}
                            image={cocktail.strDrinkThumb}
                        />
                    ))}
                </div>
            ) : (
                <p>No cocktails found.</p>
            )}
        </div>
    );
}
