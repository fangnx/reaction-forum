/**
 * PostBoard.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-13 00:46:23
 * @last-modified 2019-07-09 22:36:29
 */

import React from 'react';
import { PostBoardStyles as styles } from './PostBoardStyles';
import { getAllPosts } from '../../actions/postActions';
import { AnimationStyles } from '../../animations';
import { StyleRoot } from 'radium';

import PostView from '../PostView/PostView';
import { compareTimestamp } from '../../utils/commonUtils';

class PostBoard extends React.Component {
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
			await getAllPosts().then(async res => {
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
					{/* <Menu style={styles.toolbar}>
					<Menu.Item>
						<Button icon onClick={this.toggleShowFullCards}>
							Toggle Expansion
							<Icon
									size="large"
									name={
										this.state.showFullCards
											? 'window maximize'
											: 'window maximize outline'
									}
								/>
						</Button>
					</Menu.Item>
				</Menu> */}

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

export default PostBoard;
