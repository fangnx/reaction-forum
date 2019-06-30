/**
 * Comment.jsx
 * @author fangnx
 * @description
 * @created 2019-06-23T21:20:08.234Z-04:00
 * @copyright
 * @last-modified 2019-06-24T23:51:24.950Z-04:00
 */

import React from 'react';
import { Feed, Image } from 'semantic-ui-react';

const styles = {
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
		left: '-100%',
		borderRadius: '0'
	}
};

class CommentView extends React.Component {
	render() {
		return (
			<Feed style={{ width: '100%', margin: '0.5em 0' }}>
				<Feed.Event>
					<Feed.Label>
						<div style={styles.avatarWrapper}>
							<div style={styles.avatarCrop}>
								<img
									src={this.props.authorAvatar}
									alt=""
									style={styles.avatarImg}
								/>
							</div>
						</div>
					</Feed.Label>
					<Feed.Content style={{ marginTop: 0 }}>
						<Feed.Summary>
							{this.props.author}
							{/* <Feed.Date>{this.props.timeStamp}</Feed.Date> */}
						</Feed.Summary>
						<Feed.Extra text>{this.props.content}</Feed.Extra>
					</Feed.Content>
				</Feed.Event>
			</Feed>
		);
	}
}

export default CommentView;
