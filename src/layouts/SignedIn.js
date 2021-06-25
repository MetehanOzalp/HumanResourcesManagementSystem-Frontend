import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { useHistory } from "react-router";

export default function SignedIn({ signOut }) {

  const history = useHistory();

  const handleToCv = () => {
    history.push("/cv");
  }

  const handleToFavorites = () => {
    history.push("/favorites");
  }

  return (
    <div>
      <Menu.Item>
        <Image
          avatar
          spaced="right"
          src="https://yt3.ggpht.com/yti/ANoDKi4Xp6Lc2-ZCsDN_MKMfUbinaEJ2NtZyetz-x6YJ=s108-c-k-c0x00ffffff-no-rj"
        ></Image>
        <Dropdown pointing="top right" text="Metehan Özalp">
          <Dropdown.Menu>
            <Dropdown.Item text="Bilgilerim" icon="info" />
            <Dropdown.Item onClick={() => handleToCv()} text="Cv" icon="file" />
            <Dropdown.Item onClick={() => handleToFavorites()} text="Favorilerim" icon="heart" />
            <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}
