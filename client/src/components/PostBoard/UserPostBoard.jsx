/**
 * UserPostBoard.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-17 22:29:29
 * @last-modified 2019-07-10 00:17:15
 */

import React from 'react';
import { PostsStyles as styles } from '../PostsStyles';
import { AnimationStyles } from '../../animations';
import { StyleRoot } from 'radium';

import PostView from '../PostView/PostView';
import { store } from '../../store';
import { getAllPostsOfUser } from '../../actions/postActions';
import { compareTimestamp } from '../../utils/commonUtils';

class UserPostBoard extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = { posts: [], doAnimate: false, clickedIndex: -1 };
	}

	async componentDidMount() {
		this._isMounted = true;

		const userEmail = await store.getState().auth.user.email;
		if (this._isMounted && userEmail) {
			await getAllPostsOfUser({ userEmail: userEmail }).then(async res => {
				if (res.data) {
					await this.setState({ posts: res.data.map(post => post) });
				}
			});
		}
	}

	render() {
		const { posts } = this.state;

		return (
			<StyleRoot>
				<div style={AnimationStyles.fadeIn}>
					{posts
						.sort((a, b) => compareTimestamp(a.timeStamp, b.timeStamp))
						.map((post, index) => (
							<React.Fragment>
								<div key={'postBoard-postView-wrapper-' + index}>
									<PostView
										className="postBoard-postView"
										key={'postBoard-postView-' + index}
										canManage={true}
										pid={post._id}
										title={post.title}
										author={post.author}
										authorEmail={post.authorEmail}
										content={post.content}
										tags={post.tags}
										timeStamp={post.timeStamp}
										viewCount={post.viewCount}
										likeCount={post.likeCount}
										showFullCard={true}
									/>
								</div>

								<div style={styles.postSeparator} />
							</React.Fragment>
						))}
				</div>
			</StyleRoot>
		);
	}
}

export default UserPostBoard;
