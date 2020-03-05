import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import RecipeStore from "../../app/stores/recipeStore";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  const recipeStore = useContext(RecipeStore);
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo-grey.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          The Recipe Book
        </Menu.Item>
        <Menu.Item name="Recipes" />
        <Menu.Item>
          <Button
            onClick={recipeStore.openCreateForm}
            positive
            content="Add New Recipe"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
