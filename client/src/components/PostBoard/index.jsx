import React from 'react';
import {} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Radium, { StyleRoot } from 'radium';
import { fadeIn, headShake } from 'react-animations';
import './PostBoard.css';
import { getAllPosts } from '../../actions/postService';
import PostView from '../PostView';

const styles = {
	fadeIn: {
		animation: '1 1s',
		animationName: Radium.keyframes(fadeIn)
	},

	postViewAnimated: {
		animation: '1 1s',
		animationName: Radium.keyframes(headShake)
	}
};

class PostBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { posts: [], doAnimate: false };
	}

	componentDidMount() {
		getAllPosts().then(res => {
			// console.log(res.data);
			if (res.data) {
				this.setState({ posts: res.data.map(post => post) });
			}
		});
	}

	render() {
		const { posts, doAnimate } = this.state;
		console.log(this.state.flip);
		return (
			<StyleRoot>
				<div style={styles.fadeIn} className="postBoard-wrapper">
					{posts.map((post, index) => (
						<React.Fragment>
							<div
								onClick={() => this.setState({ doAnimate: true })}
								onAnimationEnd={() => this.setState({ doAnimate: false })}
								style={doAnimate ? styles.postViewAnimated : {}}
								key={'postBoard-postView-wrapper-' + index}
							>
								<PostView
									className="postBoard-postView"
									key={'postBoard-postView-' + index}
									title={post.title}
									author={post.author}
									content={post.content}
									tags={post.tags}
									timeStamp={post.timeStamp}
									viewCount={post.viewCount}
									likeCount={post.likeCount}
								/>
							</div>

							<div className="postBoard-separator" />
						</React.Fragment>
					))}
				</div>
			</StyleRoot>
		);
	}
}

export default PostBoard;
