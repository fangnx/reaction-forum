import React from 'react';
import { Menu } from 'semantic-ui-react';
import './Header.css';

class Header extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu stackable>
        <Menu.Item>
          <img src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>

        <Menu.Item
          name="about"
          active={activeItem === 'about'}
          onClick={this.handleItemClick}
        >
          About
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="register"
            active={activeItem === 'register'}
            onClick={this.handleItemClick}
          >
            Register
          </Menu.Item>

          <Menu.Item
            name="log-in"
            active={activeItem === 'log-in'}
            onClick={this.handleItemClick}
          >
            Log In
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
export default Header;
