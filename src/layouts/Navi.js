import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Icon, Menu } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleSignIn(params) {
    setIsAuthenticated(true);
  }

  function handleSignOut(params) {
    setIsAuthenticated(false);
  }

  return (
    <div>
      <Menu inverted fixed="top" size="large">
        <Container>
          <Menu.Item name="home">
            <Icon name="building outline" size="large" />
            <Link to={`/`}>İnsan Kaynakları Yönetim Sistemi</Link>
          </Menu.Item>
          <Menu.Item name="messages" />

          <Menu.Menu position="right">
            {isAuthenticated ? (
              <SignedIn signOut={handleSignOut} />
            ) : (
              <SignedOut signIn={handleSignIn} />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
