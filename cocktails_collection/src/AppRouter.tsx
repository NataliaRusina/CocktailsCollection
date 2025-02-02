import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AddNewCocktailPage from "./pages/addNewCocktailPage/AddNewCocktailPage";
import CocktailPage from "./pages/cocktailPage/CocktailPage";
import HomePage from "./pages/homePage/HomePage";


export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cocktail/:id" element={<CocktailPage />} />
        <Route path="/add-cocktail" element={<AddNewCocktailPage />} />
      </Routes>
    </Router>
  );
}

