import React from 'react';
import {
	Image,
	Label,
	Card,
	Form,
	TextArea,
	Input,
	Button,
	Segment,
	Icon
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PostBoard.css';
import { getAllPosts } from '../../actions/postService';
import PostView from '../PostView';

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
			<div className="postBoard-wrapper">
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
		);
	}
}

export default PostBoard;
