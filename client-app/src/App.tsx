import React from "react";
import { Header, Icon, List } from "semantic-ui-react";
import "./App.css";

function App() {
  return (
    <div>
      <Header as="h2">
        <Icon name="book" />
        <Header.Content>Recipes</Header.Content>
      </Header>
      <List>
        <List.Item>Recipe 1</List.Item>
        <List.Item>Recipe 2</List.Item>
      </List>
    </div>
  );
}

export default App;
