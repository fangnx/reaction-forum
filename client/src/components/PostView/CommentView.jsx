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

class CommentView extends React.Component {
	render() {
		return (
			<Feed style={{ width: '100%' }}>
				<Feed.Event>
					<Feed.Label>
						<Image src={this.props.authorAvatar} />
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
