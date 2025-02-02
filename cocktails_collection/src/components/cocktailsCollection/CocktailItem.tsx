import { Link } from "react-router-dom";

import "./CocktailsCollection.styles.scss";

interface CocktailItemProps {
    id: string;
    name: string;
    image: string;
}

export default function CocktailItem({ id, name, image }: CocktailItemProps) {
    return (
        <div className="cocktailItem">
            <Link to={`/cocktail/${id}`}>
                <div className="cocktailImageWrapper">
                    {image && (
                        <img
                            src={image}
                            alt={name}
                            className="cocktailImage"
                        />
                    )}
                </div>
                <h4 className="cocktailName">{name}</h4>
            </Link>
        </div>
    );
}
