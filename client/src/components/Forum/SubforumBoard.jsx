/**
 * SubforumBoard.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-09 00:16:42
 * @last-modified 2019-07-09 22:34:09
 */

import React from 'react';
import { connect } from 'react-redux';
import { PostBoardStyles as styles } from '../PostBoard/PostBoardStyles';
import { AnimationStyles } from '../../animations';
import { StyleRoot } from 'radium';

import { getAllPostsInSubforum } from '../../actions/forumActions';
import PostView from '../PostView/PostView';
import { compareTimestamp } from '../../utils/commonUtils';

class SubforumBoard extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			doAnimate: false,
			clickedIndex: -1,
			showFullCards: false
		};
	}

	toggleShowFullCards = () => {
		console.log(this.state.showFullCards);
		this.setState(previousState => ({
			showFullCards: !previousState.showFullCards
		}));
	};

	async componentDidMount() {
		this._isMounted = true;

		if (this._isMounted) {
			await getAllPostsInSubforum({ name: this.props.name }).then(async res => {
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
							<React.Fragment key={index}>
								<div
									style={
										this.state.doAnimate && index === this.state.clickedIndex
											? styles.postViewAnimated
											: {}
									}
									key={'postBoard-postView-wrapper-' + index}
								>
									<PostView
										key={'postBoard-postView-' + index}
										canManage={false}
										pid={post._id}
										title={post.title}
										author={post.author}
										authorEmail={post.authorEmail}
										content={post.content}
										tags={post.tags}
										timeStamp={post.timeStamp}
										viewCount={post.viewCount}
										likeCount={post.likeCount}
										showFullCard={this.state.showFullCards}
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

const mapStateToProps = state => {
	return {
		name: state.subforum.name
	};
};

export default connect(mapStateToProps)(SubforumBoard);
