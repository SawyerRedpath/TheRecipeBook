import React from "react";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { IRecipe } from "../../../app/models/recipe";

interface IProps {
  recipes: IRecipe[];
  selectRecipe: (id: string) => void;
  deleteRecipe: (id: string) => void;
}

export const RecipeList: React.FC<IProps> = ({
  recipes,
  selectRecipe,
  deleteRecipe
}) => {
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
                <Button
                  onClick={() => selectRecipe(recipe.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteRecipe(recipe.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic>
                  <Icon name="heart" color="red" />
                  Healthy
                </Label>
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
