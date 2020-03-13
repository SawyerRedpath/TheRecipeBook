import React from "react";
import { Item, Button, Label, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IRecipe } from "../../../app/models/recipe";

const RecipeListItem: React.FC<{ recipe: IRecipe }> = ({ recipe }) => {
  return (
    <Segment.Group style={{ marginBottom: "3rem" }}>
      <Segment clearing>
        <Item.Group>
          <Item>
            <Item.Image
              src="/assets/recipe-placeholder.jpeg"
              rounded
              size="small"
              floated="left"
            />
            <Item.Content>
              <Item.Header as="h3" style={{ marginBottom: "3px" }}>
                {recipe.title}
              </Item.Header>

              <Item.Description style={{ marginTop: "10px" }}>
                {recipe.description}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        {recipe.url && (
          <span
            style={{
              display: "inline-block",
              width: "50%",
              textAlign: "center"
            }}
          >
            <Icon name="linkify" content={recipe.url}></Icon>{" "}
            <a
              href="https://www.ruled.me/"
              style={{ textDecoration: "underline" }}
            >
              Recipe Link
            </a>
          </span>
        )}
        <span
          style={{ display: "inline-block", width: "50%", textAlign: "center" }}
        >
          <Icon name="book" /> {recipe.source}
        </span>
      </Segment>
      <Segment style={{ textAlign: "center" }}>
        <Label
          icon="food"
          content={"Prep time: " + recipe.prepTime}
          style={{ width: "30%", textAlign: "center" }}
        />
        <Label
          icon="food"
          content={"Cook time: " + recipe.cookTime}
          style={{ width: "30%", textAlign: "center" }}
        />
      </Segment>
      <Segment>
        <Label tag color="teal">
          <Icon name="heart outline" />
          Healthy
        </Label>
        <Button
          as={Link}
          to={`/recipes/${recipe.id}`}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};

export default RecipeListItem;
