/**
 * Comment.jsx
 * @author fangnx
 * @description
 * @created 2019-06-23T21:20:08.234Z-04:00
 * @copyright
 * @last-modified 2019-06-24T23:51:24.950Z-04:00
 */

import React from 'react';
import { Feed } from 'semantic-ui-react';

const styles = {
	commentFeed: {
		width: '100%',
		margin: '0.5em 0'
	},
	commentContent: {
		marginTop: '0px'
	},
	commentText: {
		fontFamily: 'Cairo'
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
		left: '-100%',
		borderRadius: '0'
	}
};

class CommentView extends React.Component {
	render() {
		return (
			<Feed style={styles.commentFeed}>
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
					<Feed.Content style={styles.commentContent}>
						<Feed.Summary>
							{this.props.author}
							{/* <Feed.Date>{this.props.timeStamp}</Feed.Date> */}
						</Feed.Summary>
						<Feed.Extra text style={styles.commentText}>
							{this.props.content}
						</Feed.Extra>
					</Feed.Content>
				</Feed.Event>
			</Feed>
		);
	}
}

export default CommentView;
