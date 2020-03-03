import React, { useState, useEffect } from "react";
import { List, Container } from "semantic-ui-react";
import axios from "axios";
import { IRecipe } from "../models/recipe";
import { NavBar } from "../../features/nav/NavBar";
import { RecipeDashboard } from "../../features/recipes/dashboard/RecipeDashboard";

const App = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    axios.get<IRecipe[]>("http://localhost:5000/api/recipes").then(response => {
      setRecipes(response.data);
    });
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <RecipeDashboard recipes={recipes} />
      </Container>
    </>
  );
};

export default App;
