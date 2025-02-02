import { useState, useTransition } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { AlcoholicStatus, Cocktail } from "../../utils/types";
import "./AddCocktailForm.styles.scss";

import { useCreateCocktail } from "../../hooks/useCreateCocktail";

export default function AddCocktailForm() {
    const [name, setName] = useState<string>("");
    const [imageName, setImageName] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [alcoholicStatus, setAlcoholicStatus] = useState<AlcoholicStatus>("Alcoholic");
    const [category, setCategory] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [cocktailsList, setCocktailsList] = useLocalStorage<Cocktail[]>("cocktails", []);
    const [isPending, startTransition] = useTransition();

    const handleClearForm = () => {
        setName("");
        setIngredients("");
        setInstructions("");
        setCategory("");
        setImage(null);
        setImageName(null);
        setAlcoholicStatus("Alcoholic");
        setMessage(null);
        setError(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMessage(null);
        if (name === "name") {
            setName(value);
        } else if (name === "ingredients") {
            setIngredients(value);
        } else if (name === "instructions") {
            setInstructions(value);
        } else if (name === "category") {
            setCategory(value);
        }
    };

    const handleAlcoholicStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(null);
        setAlcoholicStatus(e.target.value as AlcoholicStatus);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(null);
        const file = event.target.files?.[0];
        if (file) {
            setImageName(file.name);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setImage(reader.result);
                }
            };
        }
    };
    const validateForm = () => {
        if (!name || !ingredients || !instructions || !category) {
            setError("All fields are required!");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setError(null);

        startTransition(() => {
            try {
                const newCocktail = useCreateCocktail(name, ingredients, instructions, alcoholicStatus, category, image);
                setCocktailsList([...cocktailsList, newCocktail]);
                setMessage("Cocktail added successfully!");
                setName("");
                setIngredients("");
                setInstructions("");
                setCategory("");
                setImage(null);
            } catch (error) {
                setError("Failed to save cocktail.");
            } finally {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <div className="addCocktailFormContainer">
            {message && <p className="successMessage">{message}</p>}
            {error && <p className="errorMessage">{error}</p>}
            <form onSubmit={handleSubmit} className="cocktailForm">
                <div className="formGroup">
                    <label htmlFor="name">Cocktail Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                        placeholder="Enter cocktail name"
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="ingredients">Ingredients (comma separated):</label>
                    <input
                        type="text"
                        id="ingredients"
                        name="ingredients"
                        value={ingredients}
                        onChange={handleInputChange}
                        placeholder="Enter ingredients"
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="instructions">Instructions:</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={instructions}
                        onChange={handleInputChange}
                        placeholder="Enter instructions"
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={category}
                        onChange={handleInputChange}
                        placeholder="Enter category"
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="alcoholicStatus">Alcoholic Status:</label>
                    <div className="radioGroup">
                        <div>
                            <input
                                type="radio"
                                id="alcoholic"
                                name="alcoholicStatus"
                                value="Alcoholic"
                                checked={alcoholicStatus === "Alcoholic"}
                                onChange={handleAlcoholicStatusChange}
                            />
                            <label htmlFor="alcoholic">Alcoholic</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="nonAlcoholic"
                                name="alcoholicStatus"
                                value="Non_Alcoholic"
                                checked={alcoholicStatus === "Non_Alcoholic"}
                                onChange={handleAlcoholicStatusChange}
                            />
                            <label htmlFor="nonAlcoholic">Non-Alcoholic</label>
                        </div>
                    </div>
                </div>

                <div className="formGroup">
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="image">
                        Choose File
                    </label>
                    {image && <p className="fileName">{imageName}</p>}
                </div>

                <div className="buttonGroup">
                    <button type="submit" disabled={isSubmitting || isPending}>
                        {isSubmitting || isPending ? "Saving..." : "Save Cocktail"}
                    </button>
                    <button type="button" onClick={handleClearForm} className="clearButton">
                        Clear Form
                    </button>
                </div>
            </form>
        </div>
    );
}
