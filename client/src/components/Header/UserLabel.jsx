/**
 * UserLabel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-23 14:09:31
 * @last-modified 2019-07-12 00:53:24
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
		// position: 'relative',
		overflow: 'hidden',
		height: '100%',
		borderRadius: '3px'
	},
	avatarImg: {
		display: 'inline-block',
		width: '35px',
		// height: '35px',
		top: '-100%',
		right: '-100%',
		bottom: '-100%',
		left: '-100%'
	},
	label: {
		minWidth: '70px',
		maxWidth: '120px',
		height: '35px',
		borderRadius: '0%',
		margin: '0',
		paddingTop: '0',
		paddingBottom: '0',
		borderTopRightRadius: '3px',
		borderBottomRightRadius: '3px',
		background: 'transparent'
	},
	labelText: {
		fontSize: '1.25em',
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
	// getColor = async () => {
	// 	const img = document.createElement('img');
	// 	img.crossOrigin = 'anonymous';

	// 	img.addEventListener('load', async () => {
	// 		const canvas = document.createElement('canvas');
	// 		canvas.width = img.width;
	// 		canvas.height = img.height;

	// 		const ctx = canvas.getContext('2d');
	// 		ctx.drawImage(img, 0, 0);
	// 		const canvasUrl = canvas.toDataURL('image/jpg');

	// 		const themeColor = await getColorFromURL(canvasUrl);
	// 		console.log(themeColor);
	// 		await this.setState({ color: themeColor });
	// 	});

	// 	img.src = this.props.userAvatar
	// 		? this.props.userAvatar
	// 		: defaultUnisexAvatar;
	// 	console.log('x');
	// };

	render() {
		const avatar = this.props.userAvatar || defaultUnisexAvatar;

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
				<Label style={styles.label}>
					<div style={styles.labelText}>
						{this.props.userName}{' '}
						{this.props.isRSS && <Icon name="rss square" color="grey" />}
					</div>
				</Label>
			</React.Fragment>
		);
	}
}

export default UserLabel;
