import { useRef } from "react";
import { debounce } from "lodash";

import "./SearchBar.styles.scss";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {

    const debouncedSearchRef = useRef(
        debounce((query: string) => {
            if (query.trim()) {
                onSearch(query);
            } else {
                onSearch("");
            }
        }, 600)
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearchRef.current(e.target.value);
    };

    return (
        <div className="searchBar">
            <input
                type="text"
                placeholder="Search for a cocktail..."
                onChange={handleChange}
            />
        </div>
    );
}

