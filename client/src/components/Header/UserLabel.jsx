import React from 'react';
import { Label, Image } from 'semantic-ui-react';

class UserLabel extends React.Component {
	render() {
		return (
			<span>
				<Label as="a" image style={{ fontSize: '18px' }}>
					<Image src={this.props.userAvatar} />
					{this.props.userName}
				</Label>
			</span>
		);
	}
}

export default UserLabel;
