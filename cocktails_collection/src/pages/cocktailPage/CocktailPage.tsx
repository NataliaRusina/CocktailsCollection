import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useLocalStorage from "../../hooks/useLocalStorage";
import { lookupCocktailById } from "../../utils/api";
import { Cocktail } from "../../utils/types";

import CocktailRecipe from "../../components/cocktailRecipe/CocktailRecipe";
import NavigateButton from "../../components/common/buttons/NavigateButton";
import CircularLoader from "../../components/common/loaders/CircularLoader";

import "./CocktailPage.styles.scss";

export default function CocktailPage() {
    const { id } = useParams<{ id: string }>();
    const [cocktail, setCocktail] = useState<Cocktail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cocktailsList] = useLocalStorage<Cocktail[]>("cocktails", []);

    useEffect(() => {
        if (!id) return;

        const cocktailFromLocalStorage = cocktailsList.find(cocktail => cocktail.idDrink === id);

        if (cocktailFromLocalStorage) {
            setCocktail(cocktailFromLocalStorage);
            setLoading(false);
        } else {
            const fetchCocktail = async () => {
                try {
                    setLoading(true);
                    const data = await lookupCocktailById(id);
                    setCocktail(data);
                } catch (error) {
                    setError("Failed to fetch cocktail details.");
                } finally {
                    setLoading(false);
                }
            };

            fetchCocktail();
        }
    }, [id, cocktailsList]);

    return (
        <div className="cocktailPageContainer">
            <NavigateButton />
            {loading && <CircularLoader />}
            {error && <p>{error}</p>}
            {cocktail ? <CocktailRecipe cocktail={cocktail} /> : <p>No cocktail details found.</p>}
        </div>
    );
}
