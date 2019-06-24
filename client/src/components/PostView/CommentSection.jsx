/**
 * CommentSection.jsx
 * @author fangnx
 * @description
 * @created 2019-06-23T21:20:48.940Z-04:00
 * @copyright
 * @last-modified 2019-06-24T00:14:45.331Z-04:00
 */

import React from 'react';
import CommentView from './CommentView';

class CommentSection extends React.Component {
	render() {
		const comments = this.props.comments;

		return (
			<React.Fragment>
				{comments.map((comment, index) => (
					<CommentView
						key={'commentView-' + index}
						content={comment.content}
						pid={comment.pid}
						author={comment.author}
						authorEmail={comment.authorEmail}
						timeStamp={comment.timeStamp}
					/>
				))}
			</React.Fragment>
		);
	}
}

export default CommentSection;
