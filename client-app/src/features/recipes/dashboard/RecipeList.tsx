import React from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IRecipe } from "../../../app/models/recipe";

interface IProps {
  recipes: IRecipe[];
}

export const RecipeList: React.FC<IProps> = ({ recipes }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {recipes.map(recipe => (
          <Item key={recipe.id}>
            <Item.Content>
              <Item.Header as="a">{recipe.title}</Item.Header>
              <Item.Meta>{recipe.source}</Item.Meta>
              <Item.Meta>{recipe.url}</Item.Meta>
              <Item.Description>
                <div>{recipe.description}</div>
                <div>{recipe.notes}</div>
              </Item.Description>
              <Item.Extra>
                <Button floated="right" content="View" color="blue" />
                <Label basic content="Healthy" />
                <Label basic content={"Prep time: " + recipe.prepTime} />
                <Label basic content={"Cook time: " + recipe.cookTime} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default RecipeList;
