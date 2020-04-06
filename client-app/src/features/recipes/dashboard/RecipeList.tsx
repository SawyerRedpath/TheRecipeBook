import React, { useContext } from "react";
import { Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import RecipeListItem from "./RecipeListItem";
import { RootStoreContext } from "../../../app/stores/rootStore";

const RecipeList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { recipesByTitle } = rootStore.recipeStore;
  return (
    <Item.Group divided>
      {recipesByTitle.map(recipe => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </Item.Group>
  );
};

export default observer(RecipeList);
