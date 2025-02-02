import { useCallback, useEffect, useState } from "react";

import useLocalStorage from "../../hooks/useLocalStorage";
import { listCocktailsByFirstLetter, searchCocktailByName } from "../../utils/api";
import { Cocktail } from "../../utils/types";

import CocktailsCollection from "../../components/cocktailsCollection/CocktailsCollection";
import NavigateButton from "../../components/common/buttons/NavigateButton";
import CircularLoader from "../../components/common/loaders/CircularLoader";
import SearchBar from "../../components/searchBar/SearchBar";

import "./HomePage.styles.scss";

export default function HomePage() {
    const [cocktailsList, setCocktailsList] = useState<Cocktail[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [cocktailsFromStorage] = useLocalStorage("cocktails", []);

    const getLocalCocktailsByLetter = (letter: string) => {
        return cocktailsFromStorage.filter(
            (cocktail: Cocktail) => cocktail.strDrink.toLowerCase().startsWith(letter.toLowerCase())
        );
    };

    const loadCocktailsByLetterA = useCallback(async () => {
        try {
            setLoading(true);
            const preloadedCocktails = await listCocktailsByFirstLetter("a");
            const localCocktails = getLocalCocktailsByLetter("a");

            const combinedResults = [...preloadedCocktails, ...localCocktails].sort((a, b) =>
                a.strDrink.localeCompare(b.strDrink)
            );

            setCocktailsList(combinedResults);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [cocktailsFromStorage]);

    const handleSearch = useCallback(
        async (query: string) => {
            if (!query.trim()) {
                loadCocktailsByLetterA();
                return;
            }
            setLoading(true);
            try {
                const resultsFromApi = await searchCocktailByName(query);
                const localResults = cocktailsFromStorage.filter((cocktail: Cocktail) =>
                    cocktail.strDrink.toLowerCase().includes(query.toLowerCase())
                );

                const combinedResults = [...resultsFromApi, ...localResults].sort((a, b) =>
                    a.strDrink.localeCompare(b.strDrink)
                );

                setCocktailsList(combinedResults);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        [cocktailsFromStorage, loadCocktailsByLetterA]
    );

    useEffect(() => {
        loadCocktailsByLetterA();
    }, [loadCocktailsByLetterA]);

    return (
        <div className="container">
            <div className="searchAndCreateWrapper">
                <div className="searchWrapper">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="createWrapper">
                    <NavigateButton to={"/add-cocktail"} label={"Create new"} />
                </div>
            </div>
            {loading ? <CircularLoader /> : <CocktailsCollection cocktailsList={cocktailsList} />}
        </div>
    );
}
