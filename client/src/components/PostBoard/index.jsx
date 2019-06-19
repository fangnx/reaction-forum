import React from 'react';
import Radium, { StyleRoot } from 'radium';
import {} from 'semantic-ui-react';
import { fadeIn, headShake } from 'react-animations';
import { getAllPosts } from '../../actions/postService';
import PostView from '../PostView';

const styles = {
	fadeIn: {
		animation: '1 0.4s',
		animationName: Radium.keyframes(fadeIn)
	},

	postViewAnimated: {
		animation: '1 1s',
		animationName: Radium.keyframes(headShake)
	},

	postBoardSeparator: {
		visibility: 'hidden',
		height: '60px'
	}
};

class PostBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { posts: [], doAnimate: false, clickedIndex: -1 };
	}

	componentDidMount() {
		getAllPosts().then(res => {
			if (res.data) {
				this.setState({ posts: res.data.map(post => post) });
			}
		});
	}

	render() {
		const { posts } = this.state;

		return (
			<StyleRoot>
				<div style={styles.fadeIn}>
					{posts.map((post, index) => (
						<React.Fragment>
							<div
								onClick={() =>
									this.setState({ doAnimate: true, clickedIndex: index })
								}
								onAnimationEnd={() =>
									this.setState({ doAnimate: false, clickedIndex: -1 })
								}
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
									canManage={false}
									title={post.title}
									author={post.author}
									content={post.content}
									tags={post.tags}
									timeStamp={post.timeStamp}
									viewCount={post.viewCount}
									likeCount={post.likeCount}
								/>
							</div>

							<div style={styles.postBoardSeparator} />
						</React.Fragment>
					))}
				</div>
			</StyleRoot>
		);
	}
}

export default PostBoard;
