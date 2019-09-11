/**
 * Comment.jsx
 * @author fangnx
 * @description
 * @created 2019-06-23T21:20:08.234Z-04:00
 * @copyright
 * @last-modified 2019-06-24T23:51:24.950Z-04:00
 */

import React from 'react';
import { Feed, Label } from 'semantic-ui-react';

const styles = {
	commentFeed: {
		fontFamily: 'var(--font-style)',
		width: '100%',
		margin: '0.5em 0'
	},
	commentUserLabel: {
		backgroundColor: 'var(--theme-blue)',
		color: 'var(--theme-white-1)',
		fontWeight: 'bold'
	},
	commentContent: {
		fontWeight: '500',
		marginTop: '0px'
	},
	commentText: {},
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
		left: '-100%',
		borderRadius: '0'
	},
	userName: {
		color: 'var(--theme-navy-1)',
		display: 'inline-block',
		marginRight: '0.25em'
	},
	userAction: {
		display: 'inline-block'
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
							<div style={styles.userName}>{this.props.author}</div>
							<div style={styles.userAction}>reacted</div>
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
