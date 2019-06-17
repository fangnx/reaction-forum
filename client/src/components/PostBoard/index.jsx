import React from 'react';
import {} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations';
import './PostBoard.css';
import { getAllPosts } from '../../actions/postService';
import PostView from '../PostView';

const styles = {
	fadeIn: {
		animation: '1 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn')
	}
};

class PostBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { posts: [] };
	}

	componentDidMount() {
		getAllPosts().then(res => {
			console.log(res.data);
			if (res.data) {
				this.setState({ posts: res.data.map(post => post) });
			}
		});
	}

	render() {
		const { posts } = this.state;
		return (
			<StyleRoot>
				<div style={styles.fadeIn} className="postBoard-wrapper">
					{posts.map(post => (
						<React.Fragment>
							<PostView
								className="postBoard-postView"
								title={post.title}
								author={post.author}
								content={post.content}
								tags={post.tags}
								timeStamp={post.timeStamp}
								viewCount={post.viewCount}
								likeCount={post.likeCount}
							/>
							<div className="postBoard-separator" />
						</React.Fragment>
					))}
				</div>
			</StyleRoot>
		);
	}
}

export default PostBoard;
