import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <HashRouter>
        <Menu stackable>
          <Menu.Item>
            <img src="https://react.semantic-ui.com/logo.png" />
          </Menu.Item>
          <Menu.Item as={NavLink} to="/" exact name="about" />
          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/registration" name="register" />
            <Menu.Item as={NavLink} to="/login" name="login" />
          </Menu.Menu>
        </Menu>
      </HashRouter>
    );
  }
}
export default Header;
