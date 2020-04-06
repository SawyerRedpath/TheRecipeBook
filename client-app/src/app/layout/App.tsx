import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import RecipeDashboard from "../../features/recipes/dashboard/RecipeDashboard";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import RecipeForm from "../../features/recipes/form/RecipeForm";
import RecipeDetails from "../../features/recipes/details/RecipeDetails";
import NotFound from "./NotFound";
import LoginForm from "../../features/user/LoginForm";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/recipes" component={RecipeDashboard} />
                <Route path="/recipes/:id" component={RecipeDetails} />
                <Route
                  key={location.key}
                  path={["/createRecipe", "/manage/:id"]}
                  component={RecipeForm}
                />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
