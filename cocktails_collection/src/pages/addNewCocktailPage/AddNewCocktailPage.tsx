import AddCocktailForm from "../../components/addCocktailForm/AddCocktailForm";
import NavigateButton from "../../components/common/buttons/NavigateButton";

import "./AddNewCocktailPage.styles.scss";

export default function AddNewCocktailPage() {
    return (
        <div className="addNewCocktailPageContainer">
            <NavigateButton />
            <AddCocktailForm />
        </div>
    );
}
