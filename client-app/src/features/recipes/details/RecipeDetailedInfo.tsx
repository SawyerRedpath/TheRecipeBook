import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IRecipe } from "../../../app/models/recipe";
import { observer } from "mobx-react-lite";

const RecipeDetailedInfo: React.FC<{ recipe: IRecipe }> = ({ recipe }) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="blue" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{recipe.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="linkify" size="large" color="blue" />
          </Grid.Column>
          <Grid.Column width={15}>
            <a
              href="https://www.ruled.me/"
              style={{
                display: "inline-block",
                width: "50%",
                textDecoration: "underline"
              }}
            >
              <span>{recipe.url}</span>
            </a>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="food" size="large" color="blue" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span style={{ marginRight: "10%" }}>
              <strong>Prep Time: </strong>
              {recipe.prepTime}.{" "}
            </span>
            <span>
              <strong>Cook Time: </strong>
              {recipe.cookTime}.
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="sticky note" size="large" color="blue" />
          </Grid.Column>
          <Grid.Column width={11}>
            <p>{recipe.notes}</p>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(RecipeDetailedInfo);
