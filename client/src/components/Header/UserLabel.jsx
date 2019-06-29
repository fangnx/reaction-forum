import React from 'react';
import { Label, Image, Placeholder, Loader } from 'semantic-ui-react';
import { getColorFromURL } from 'color-thief-node';

const defaultUnisexAvatar =
	'https://firebasestorage.googleapis.com/v0/b/fangnx-rview.appspot.com/o/defaultUnisexAvatar.svg?alt=media&token=7c1142e6-4698-4d20-874e-385a652da894';

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

	componentWillReceiveProps() {}

	render() {
		const rgb = 'rgb(' + this.state.color.join(', ') + ')';
		const labelStyle = { background: rgb, fontSize: '16px' };
		const avatar = this.props.userAvatar || defaultUnisexAvatar;

		return (
			<span>
				<Label as="a" image style={labelStyle}>
					<Image
						src={avatar}
						onLoad={this.onLoad}
						style={
							this.state.loaded
								? { display: 'inline-block' }
								: { display: 'none' }
						}
					/>

					<Loader
						inline
						active
						size="tiny"
						style={
							!this.state.loaded
								? {
										display: 'inline-block'
								  }
								: { display: 'none' }
						}
					/>

					{this.props.userName}
				</Label>
			</span>
		);
	}
}

export default UserLabel;
