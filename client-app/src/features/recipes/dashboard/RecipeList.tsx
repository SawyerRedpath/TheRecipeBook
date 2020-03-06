import React, { useContext } from "react";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import RecipeStore from "../../../app/stores/recipeStore";
import { Link } from "react-router-dom";

const RecipeList: React.FC = () => {
  const recipeStore = useContext(RecipeStore);
  const { recipesByTitle, deleteRecipe, submitting, target } = recipeStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {recipesByTitle.map(recipe => (
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
                  as={Link}
                  to={`/recipes/${recipe.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={recipe.id}
                  loading={target === recipe.id && submitting}
                  onClick={e => deleteRecipe(e, recipe.id)}
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

export default observer(RecipeList);
