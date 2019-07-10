import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import {
	Label,
	Card,
	Grid,
	TextArea,
	Input,
	Button,
	Segment,
	Icon,
	Message
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ManagePostStyles as styles } from '../ManagePostStyles';
import { AnimationStyles } from '../../animations';
import { StyleRoot } from 'radium';

import dateFormat from 'dateformat';
import { editPost } from '../../actions/postActions';
import { store } from '../../store';
import {
	mergeStyles,
	capitalizeTag,
	SPACE_KEY,
	COMMA_KEY,
	BACKSPACE_KEY,
	TAG_COLORS
} from '../../utils/commonUtils';

class EditPost extends React.Component {
	constructor() {
		super();
		this.state = {
			pid: '',
			title: '',
			content: '',
			author: '',
			authorEmail: '',
			timeStamp: '',
			tags: [],
			currentTag: '',
			success: false
		};

		this.onKeyUp = this.onKeyUp.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.appendTag = this.appendTag.bind(this);
	}

	onKeyUp(e) {
		const key = e.keyCode;
		if (key === SPACE_KEY || key === COMMA_KEY) {
			this.appendTag();
		}
	}

	onKeyDown(e) {
		const key = e.keyCode;
		if (key === BACKSPACE_KEY && !this.state.currentTag) {
			this.editTag();
		}
	}

	appendTag() {
		const { tags, currentTag } = this.state;
		let rawTag = currentTag.trim();
		rawTag = rawTag.replace(/,/g, '');

		if (rawTag) {
			this.setState({
				tags: [...tags, rawTag],
				currentTag: '' // Empties the tag currently selected
			});
		}
	}

	editTag() {
		const { tags } = this.state;
		const lastTag = tags.pop();
		this.setState({ currentTag: lastTag });
	}

	onChange = (e, data) => {
		this.setState({ [data.id]: data.value });
	};

	componentDidMount() {
		this.setState({
			pid: this.props.pid,
			title: this.props.title,
			content: this.props.content,
			timeStamp: this.props.timeStamp,
			tags: this.props.tags
		});

		if (!!store.getState().auth.isAuthenticated) {
			this.setState({
				author: store.getState().auth.user.name,
				authorEmail: store.getState().auth.user.email
			});
		}
	}

	onSubmit = async e => {
		e.preventDefault();
		const update = {
			pid: this.state.pid,
			title: this.state.title,
			content: this.state.content,
			timeStamp: dateFormat(new Date(), 'isoDateTime'),
			tags: this.state.tags
		};

		editPost(update).then(res => {
			if (res.status === 200) {
				this.setState({ success: true });
			}
		});
	};

	render() {
		return (
			<StyleRoot>
				<div style={mergeStyles([AnimationStyles.fadeIn, styles.wrapper])}>
					<Card style={styles.card} fluid>
						<Card.Content style={styles.cardContent}>
							<Grid padded>
								<Grid.Row>
									<Label style={styles.label} size="large">
										Title
									</Label>

									<Segment
										as={TextArea}
										id="title"
										value={this.state.title}
										onChange={this.onChange}
										placeholder=""
										rows="1"
										style={mergeStyles([styles.field, styles.title])}
									/>
								</Grid.Row>

								<Grid.Row>
									<Label style={styles.label} size="large">
										Content
									</Label>

									<Segment
										as={TextArea}
										id="content"
										value={this.state.content}
										onChange={this.onChange}
										placeholder="Write whatever you want ;)"
										rows="12"
										style={mergeStyles([styles.field, styles.content])}
									/>

									<Segment style={mergeStyles([styles.field, styles.content])}>
										<ReactMarkdown source={this.state.content} />
									</Segment>
								</Grid.Row>

								<Grid.Row>
									<div>
										<Label style={styles.label} size="large">
											Tags
										</Label>
									</div>

									<Segment
										id="tags"
										style={mergeStyles([styles.field, styles.tags])}
									>
										<Label.Group>
											{this.state.tags.map((tag, index) => (
												<Label color={TAG_COLORS[index % TAG_COLORS.length]}>
													{capitalizeTag(tag)}
													<Icon name="delete" />
												</Label>
											))}
										</Label.Group>
										<Input
											id="currentTag"
											placeholder="Add tags here"
											value={this.state.currentTag}
											onChange={this.onChange}
											onKeyUp={this.onKeyUp}
											onKeyDown={this.onKeyDown}
										/>
									</Segment>
								</Grid.Row>
								{this.state.success ? (
									<Grid.Row>
										<Message
											success
											header="Success"
											content="Posted!"
											style={styles.field}
										/>
									</Grid.Row>
								) : (
									''
								)}

								<Grid.Row>
									<Button
										disabled={false}
										onClick={this.onSubmit}
										animated="vertical"
										size="big"
										primary
										style={styles.button}
									>
										<Button.Content visible>Submit</Button.Content>
										<Button.Content hidden>
											<FontAwesomeIcon icon={['fas', 'check']} size="1x" />
										</Button.Content>
									</Button>
								</Grid.Row>
							</Grid>
						</Card.Content>
					</Card>
				</div>
			</StyleRoot>
		);
	}
}

const mapStateToProps = state => {
	return {
		pid: state.editPost.pid,
		title: state.editPost.title,
		content: state.editPost.content,
		timeStamp: state.editPost.timeStamp,
		tags: state.editPost.tags
	};
};

export default connect(mapStateToProps)(EditPost);
