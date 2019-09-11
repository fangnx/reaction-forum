/**
 * PostView.jsx
 * @author fangnx
 * @description
 * @created 2019-06-14T01:31:06.070Z-04:00
 * @copyright
 * @last-modified 2019-06-25T00:27:25.160Z-04:00
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	addComment,
	getAllCommentsOfPost,
	deletePost
} from '../../actions/postActions';
import { getAvatarData } from '../../actions/userActions';
import UserLabel from '../Header/UserLabel';
import CommentSection from './CommentSection';
import ReactMarkdown from 'react-markdown';
import dateFormat from 'dateformat';
import { TAG_COLORS, mergeStyles } from '../../utils/commonUtils';
import {
	Label,
	Card,
	Grid,
	Icon,
	Input,
	TextArea,
	Modal,
	Button,
	Segment
} from 'semantic-ui-react';
import { ViewPostStyles as styles } from '../ViewPostStyles';

class PostView extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			showFullCard: props.showFullCard,
			authorAvatar: '',
			showComments: false,
			comments: [],
			newCommentContent: '',
			shouldRedirect: false
		};
		this.directToEditPost = this.directToEditPost.bind(this);
		this.loadComments = this.loadComments.bind(this);
		this.onShowComments = this.onShowComments.bind(this);
	}

	capitalizeTag(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	toggleShowFullCard = () => {
		this.setState(previousState => ({
			showFullCard: !previousState.showFullCard
		}));
	};

	directToEditPost() {
		this.setState({ shouldEdit: true });
	}

	deleteModalClose = confirmDelete => {
		this.setState({ deleteModalOpened: false });
		if (confirmDelete) {
			deletePost({ pid: this.props.pid }).then();
		}
	};

	onChange = (e, data) => {
		this.setState({ [data.id]: data.value });
	};

	onDeleteClicked = e => {
		e.preventDefault();
		this.setState({ deleteModalOpened: true });
	};

	onAddComment = e => {
		e.preventDefault();

		const newComment = {
			content: this.state.newCommentContent,
			pid: this.props.pid,
			author: this.props.auth.user.name,
			authorEmail: this.props.auth.user.email,
			timeStamp: dateFormat(new Date(), 'isoDateTime')
		};

		addComment(newComment).then(res => {
			if (res.status === 200) {
				this.loadComments();
				this.setState({ showComments: true });
			}
		});
	};

	loadComments = async () => {
		if (this._isMounted) {
			await getAllCommentsOfPost({ pid: this.props.pid }).then(res => {
				if (res.data) {
					this.setState({ comments: res.data.map(comment => comment) });
				}
			});
		}
	};

	onShowComments = async () => {
		if (this.state.showComments === false) {
			await this.loadComments();
			this.setState({ showComments: true });
		} else {
			this.setState({ showComments: false });
		}
	};

	componentDidMount = async () => {
		this._isMounted = true;

		if (this._isMounted) {
			getAvatarData({ email: this.props.authorEmail }).then(res => {
				if (res.data.avatar) {
					this.setState({ authorAvatar: res.data.avatar });
				} else {
					this.setState({ authorAvatar: '' });
				}
			});
		}
	};

	componentWillReceiveProps = () => {
		this.setState({ showFullCard: this.props.showFullCard });
	};

	render() {
		const { pid, title, content, timeStamp, tags } = this.props;
		if (this.state.shouldEdit) {
			this.props.dispatch({
				type: 'EDIT_POST',
				payload: { pid, title, content, timeStamp, tags }
			});
			this.props.history.push({
				pathname: '/post/edit'
			});
		}

		return (
			<div style={styles.wrapper} className="postview">
				<Card style={styles.card} fluid>
					<Card.Content style={styles.cardContent}>
						<Grid padded>
							<Grid.Row style={mergeStyles([styles.field, styles.top])}>
								<UserLabel
									userName={this.props.author}
									userAvatar={this.state.authorAvatar}
									isRSS={this.props.isRSS}
								/>
							</Grid.Row>

							<Grid.Row
								columns="2"
								id="postview-icons-row"
								style={{ marginTop: '-45px' }} // TODO: remove the magic number.
							>
								<Grid.Column style={styles.column} />
								<Grid.Column style={styles.column}>
									<div style={styles.iconGroup}>
										{this.props.canManage ? (
											<>
												<Icon
													size="large"
													name="file alternate outline"
													onClick={this.directToEditPost}
													style={styles.icon}
												/>
												&nbsp;
												<Icon
													size="large"
													name="close"
													color="red"
													onClick={this.onDeleteClicked}
													style={styles.icon}
												/>
											</>
										) : (
											''
										)}
										&nbsp;
										<Icon
											size="large"
											name={
												this.state.showFullCard ? 'minus square' : 'plus square'
											}
											onClick={this.toggleShowFullCard}
											style={styles.icon}
										/>
									</div>
								</Grid.Column>
							</Grid.Row>

							<Grid.Row
								style={
									this.state.showFullCard
										? mergeStyles([styles.field, styles.title])
										: mergeStyles([styles.field, styles.titleTight])
								}
							>
								{this.state.showFullCard ? (
									<h1>{this.props.title}</h1>
								) : (
									<h2>{this.props.title}</h2>
								)}
							</Grid.Row>

							{this.state.showFullCard ? (
								<>
									<Grid.Row>
										<Segment
											style={mergeStyles([styles.field, styles.content])}
										>
											<ReactMarkdown
												className="markdown"
												source={this.props.content}
											/>
										</Segment>
									</Grid.Row>

									<Grid.Row>
										<Label
											size="large"
											style={mergeStyles([styles.field, styles.sectionLabel])}
										>
											Tags &nbsp;
											<Icon name="tags" />
										</Label>
									</Grid.Row>

									<Grid.Row>
										<Label.Group
											size="medium"
											style={mergeStyles([styles.field, styles.tags])}
										>
											{this.props.tags.map((tag, index) => (
												<Label
													key={'postView-tag-' + index}
													style={{
														backgroundColor:
															TAG_COLORS[index % TAG_COLORS.length]
													}}
												>
													{this.capitalizeTag(tag)}
												</Label>
											))}
										</Label.Group>
									</Grid.Row>

									{/* <Grid.Row>
										<span style={mergeStyles([styles.field, styles.timeStamp])}>
											Last modified at {this.props.timeStamp.split('T')[0]}
										</span>
									</Grid.Row> */}

									<Grid.Row>
										<Label
											onClick={this.onShowComments}
											size="large"
											style={mergeStyles([styles.field, styles.sectionLabel])}
										>
											Reactions &nbsp;
											<Icon name="comments" />
										</Label>
									</Grid.Row>

									{this.state.showComments ? (
										<>
											<Grid.Row
												style={mergeStyles([styles.field, styles.commentsRow])}
											>
												<CommentSection comments={this.state.comments} />
											</Grid.Row>
											<TextArea
												as={Input}
												id="newCommentContent"
												value={this.state.newCommentContent}
												onChange={this.onChange}
												placeholder="Express your reactions: "
												rows="2"
												icon={
													<Button icon style={styles.commentSubmitButton}>
														<Icon
															name="check"
															onClick={this.onAddComment}
															size="large"
															color="black"
														/>
													</Button>
												}
												style={styles.commentInput}
											/>
										</>
									) : (
										<></>
									)}
								</>
							) : (
								<></>
							)}
						</Grid>

						<Modal
							open={this.state.deleteModalOpened}
							onClose={this.deleteModalClose}
						>
							<Modal.Header>Deleting your post</Modal.Header>
							<Modal.Content image>
								<p>Are you sure you would like to have this post removed?</p>
							</Modal.Content>
							<Modal.Actions>
								<Button
									positive
									content="Nope, I would keep it :)"
									color="black"
									onClick={() => this.deleteModalClose(false)}
								/>
								<Button
									negative
									icon="checkmark"
									labelPosition="right"
									content="Yes, delete it"
									onClick={() => this.deleteModalClose(true)}
								/>
							</Modal.Actions>
						</Modal>
					</Card.Content>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(withRouter(PostView));
