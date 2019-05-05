import React from "react";
import { Menu } from "semantic-ui-react";
import "./Header.css";

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
          name="features"
          active={activeItem === 'features'}
          onClick={this.handleItemClick}
        >
          Features
        </Menu.Item>

        <Menu.Item
          name="Register"
          active={activeItem === 'sign-in'}
          onClick={this.handleItemClick}
        >
          Register
        </Menu.Item>
      </Menu>
    );
  }
}
export default Header;
