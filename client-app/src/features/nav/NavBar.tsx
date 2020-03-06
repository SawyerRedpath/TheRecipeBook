import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/logo-grey.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          The Recipe Book
        </Menu.Item>
        <Menu.Item name="Recipes" as={NavLink} to="/recipes" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createRecipe"
            positive
            content="Add New Recipe"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
