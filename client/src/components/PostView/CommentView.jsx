/**
 * Comment.jsx
 * @author fangnx
 * @description
 * @created 2019-06-23T21:20:08.234Z-04:00
 * @copyright
 * @last-modified 2019-06-23T21:26:02.874Z-04:00
 */

import React from 'react';
import { Feed } from 'semantic-ui-react';

class CommentView extends React.Component {
	render() {
		return (
			<Feed>
				<Feed.Event>
					<Feed.Content>
						<Feed.Summary>
							<Feed.User>{this.props.author}</Feed.User> commented
						</Feed.Summary>
						<Feed.Extra text>{this.props.content}</Feed.Extra>
					</Feed.Content>
				</Feed.Event>
			</Feed>
		);
	}
}

export default CommentView;
