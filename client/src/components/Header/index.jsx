import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import { Menu, Button, Label, Image } from 'semantic-ui-react';
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
            <Menu.Item
              as={NavLink}
              to="/registration"
              name="register"
              color="teal"
            >
              <span>Register</span>
            </Menu.Item>
            {/* <Menu.Item>
              <Button as={NavLink} primary to="/registration" name="register">
                <span>Register</span>
              </Button>
            </Menu.Item> */}

            <Menu.Item as={NavLink} to="/login" name="login" color="teal">
              <span>Login</span>
            </Menu.Item>
            {/* <Menu.Item>
              <Button as={NavLink} primary to="/login" name="login">
                <span>Login</span>
              </Button>
            </Menu.Item> */}

            <Menu.Item>
              <Label as="a" color="teal" size="big" image>
                {/* <Image src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" /> */}
                <span>
                  Joe &nbsp;&nbsp;
                  <i class="mongolia flag" />
                </span>
                <Label.Detail>User</Label.Detail>
              </Label>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </HashRouter>
    );
  }
}
export default Header;
