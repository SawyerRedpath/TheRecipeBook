import React from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
          <Header as="h1" inverted>
            <Image
              size="massive"
              src="/assets/logo-white.png"
              alt="logo"
              style={{ marginBottom: 12 }}
            />
            The Recipe Book
          </Header>
          <Header as="h2" inverted content="Welcome to The Recipe Book" />
          <Button as={Link} to="/recipes" size="huge" inverted>
            Take me to the recipes!
          </Button>
        </Container>
      </Segment>
    </>
  );
};

export default HomePage;
