import React from "react";
import { Container } from "semantic-ui-react";

import NavBar from "../../features/nav/NavBar";
import RecipeDashboard from "../../features/recipes/dashboard/RecipeDashboard";

import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import RecipeForm from "../../features/recipes/form/RecipeForm";
import RecipeDetails from "../../features/recipes/details/RecipeDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/recipes" component={RecipeDashboard} />
              <Route path="/recipes/:id" component={RecipeDetails} />
              <Route
                key={location.key}
                path={["/createRecipe", "/manage/:id"]}
                component={RecipeForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
