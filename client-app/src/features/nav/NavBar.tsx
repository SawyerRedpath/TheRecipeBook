import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

export const NavBar = () => {
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
          <Button positive content="Add New Recipe" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
