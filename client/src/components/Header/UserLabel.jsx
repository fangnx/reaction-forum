/**
 * UserLabel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-23 14:09:31
 * @last-modified 2019-09-10 02:29:34
 */

import React from 'react';
import { Label, Loader, Icon } from 'semantic-ui-react';

const defaultUnisexAvatar =
	'https://firebasestorage.googleapis.com/v0/b/fangnx-rview.appspot.com/o/defaultUnisexAvatar.svg?alt=media&token=7c1142e6-4698-4d20-874e-385a652da894';

const styles = {
	loader: {
		display: 'inline-block',
		width: '35px',
		height: '35px'
	},
	avatarWrapper: {
		display: 'inline-block',
		width: '35px',
		height: '35px'
	},
	avatarCrop: {
		overflow: 'hidden',
		height: '100%',
		borderRadius: '2px'
	},
	avatarImg: {
		display: 'inline-block',
		width: '35px',
		top: '-100%',
		right: '-100%',
		bottom: '-100%',
		left: '-100%'
	},
	label: {
		minWidth: '60px',
		maxWidth: '180px',
		height: '35px',
		borderRadius: '0%',
		margin: '0',
		paddingTop: '0',
		paddingBottom: '0',
		borderTopRightRadius: '3px',
		borderBottomRightRadius: '3px'
	},
	labelText: {
		color: 'var(--theme-white-1)',
		paddingTop: '10px'
	}
};

class UserLabel extends React.Component {
	constructor() {
		super();
		this.state = { color: [180, 180, 180], loaded: false };
		this.onLoad = this.onLoad.bind(this);
	}

	onLoad = () => {
		this.setState({ loaded: true });
	};

	render() {
		const avatar = this.props.userAvatar || defaultUnisexAvatar;
		const background = this.props.transparent
			? 'transparent'
			: 'var(--theme-blue)';
		const fontSize = this.props.largeText ? '1.1rem' : '1rem';

		return (
			<React.Fragment>
				<div style={styles.avatarWrapper}>
					<div style={styles.avatarCrop}>
						<Loader
							inline
							active
							size="medium"
							style={!this.state.loaded ? styles.loader : { display: 'none' }}
						/>
						<img
							src={avatar}
							alt="avatar"
							onLoad={this.onLoad}
							style={this.state.loaded ? styles.avatarImg : { display: 'none' }}
						/>
					</div>
				</div>
				<Label style={{ ...styles.label, background }}>
					<div style={{ ...styles.labelText, fontSize }}>
						{this.props.userName}{' '}
						{this.props.isRSS && <Icon name="rss square" color="white" />}
					</div>
				</Label>
			</React.Fragment>
		);
	}
}

export default UserLabel;
