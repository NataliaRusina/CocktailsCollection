import { useNavigate } from "react-router-dom";

import "./NavigateButton.styles.scss";

interface NavigateButtonProps {
    to?: string;
    label?: string;
}

export default function NavigateButton({ to = "/", label = "Home" }: NavigateButtonProps) {
    const navigate = useNavigate();

    return (
        <button className="navigateButton" onClick={() => navigate(to)}>
            {label}
        </button>
    );
}
