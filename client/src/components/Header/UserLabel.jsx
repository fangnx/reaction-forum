import React from 'react';
import { Menu, Label, Image } from 'semantic-ui-react';

class UserLabel extends React.Component {
	render() {
		return (
			<Menu.Item>
				<span>
					<Image avatar src={this.props.userAvatar} alt="" />
					{this.props.userName}
				</span>
			</Menu.Item>
		);
	}
}

export default UserLabel;
