/**
 * UserPostBoard.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-17 22:29:29
 * @last-modified 2019-07-08 00:11:45
 */

import React from 'react';
import { PostBoardStyles as styles } from './PostBoardStyles';
import { store } from '../../store';
import { getAllPostsOfUser } from '../../actions/postActions';
import PostView from '../PostView/PostView';

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
			<div>
				{posts.map((post, index) => (
					<React.Fragment>
						<div
							style={
								this.state.doAnimate && index === this.state.clickedIndex
									? styles.postViewAnimated
									: {}
							}
							key={'postBoard-postView-wrapper-' + index}
						>
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

						<div style={styles.postBoardSeparator} />
					</React.Fragment>
				))}
			</div>
		);
	}
}

export default UserPostBoard;
