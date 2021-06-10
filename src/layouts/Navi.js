import React from "react";
import { Button, Container, Dropdown, Icon, Menu } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item name="home">
            <Icon name="building outline" size="large" />
            İnsan Kaynakları Yönetim Sistemi
          </Menu.Item>
          <Menu.Item name="messages" />

          <Menu.Menu position="right">
            <Button.Group>
              <Button primary>Kaydol</Button>
              <Button.Or text="-" />
              <Button positive>Giris Yap</Button>
            </Button.Group>
            <Dropdown item text="İsveren">
              <Dropdown.Menu>
                <Dropdown.Item>Giriş Yap</Dropdown.Item>
                <Dropdown.Item>Kayıt Ol</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
