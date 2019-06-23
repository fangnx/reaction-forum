import React from 'react';
import { Menu, Label, Image } from 'semantic-ui-react';

class UserLabel extends React.Component {
	render() {
		return (
			<Menu.Item>
				<Label as="a" color="teal" size="big" image>
					<Image src={this.props.userAvatar} />
					<span>{this.props.userName}</span>
				</Label>
			</Menu.Item>
		);
	}
}

export default UserLabel;
