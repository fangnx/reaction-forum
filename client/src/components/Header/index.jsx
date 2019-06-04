import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <HashRouter>
        <Menu inverted className="header-menu">
          <Menu.Item as={NavLink} to="/" exact name="main">
            <span>——</span>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/registration" name="register">
              <span>Register</span>
            </Menu.Item>

            <Menu.Item as={NavLink} to="/login" name="login">
              <span>Login</span>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </HashRouter>
    );
  }
}
export default Header;
