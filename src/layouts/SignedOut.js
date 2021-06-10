import React from "react";
import { Button, Menu } from "semantic-ui-react";

export default function SignedOut({ signIn }) {
  return (
    <div>
      <Menu.Menu style={{ marginTop: "0.55em", marginBottom: "0.55em" }}>
        <Button.Group size="large">
          <Button onClick={signIn} positive>
            Giris Yap
          </Button>
          <Button.Or text="-" />
          <Button primary>Kaydol</Button>
        </Button.Group>
      </Menu.Menu>
    </div>
  );
}
