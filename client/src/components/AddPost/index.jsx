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
	Icon,
	Message
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddPost.css';
import dateFormat from 'dateformat';
import { addPost } from '../../actions/postActions';
import { store } from '../../store';

const SPACE_KEY = 32;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;
const tagColors = [
	'orange',
	'yellow',
	'olive',
	'green',
	'teal',
	'blue',
	'purple',
	'brown',
	'grey'
];

class AddPost extends React.Component {
	constructor() {
		super();
		this.state = {
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

	capitalizeTag(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
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
		if (!!store.getState().auth.isAuthenticated) {
			this.setState({
				author: store.getState().auth.user.name,
				authorEmail: store.getState().auth.user.email
			});
		}
	}

	onSubmit = async e => {
		e.preventDefault();
		const newPost = {
			title: this.state.title,
			content: this.state.content,
			author: this.state.author,
			authorEmail: this.state.authorEmail,
			timeStamp: dateFormat(new Date(), 'isoDateTime'),
			tags: this.state.tags,
			viewCount: 0,
			likeCount: 0
		};

		addPost(newPost).then(res => {
			if (res.status === 200) {
				this.setState({ success: true });
			}
		});
	};

	render() {
		const { tags, success } = this.state;

		return (
			<div className="addPost-wrapper">
				<Card className="addPost-card" fluid>
					<Card.Content className="addPost-card-content">
						<Form success={!!success} className="addPost-form">
							<Form.Field className="addPost-title-field">
								<Label color="grey" size="large">
									Title
								</Label>
								<Input
									id="title"
									value={this.state.title}
									onChange={this.onChange}
									placeholder=""
								/>
							</Form.Field>

							<Form.Field className="addPost-content-field">
								<Label
									color="grey"
									size="large"
									style={{ marginBottom: '15px' }}
								>
									Content
								</Label>
								<TextArea
									id="content"
									value={this.state.content}
									onChange={this.onChange}
									placeholder="Write whatever you want ;)"
									rows="12"
								/>
							</Form.Field>

							<Form.Field className="addPost-tags-field">
								<div className="addPost-tags-label-wrapper">
									<Label color="grey" size="large">
										Tags
									</Label>
								</div>

								<Segment>
									<Label.Group size="large" className="addPost-tagList">
										{tags.map((tag, index) => (
											<Label
												className="addPost-tag"
												color={tagColors[index % tagColors.length]}
											>
												{this.capitalizeTag(tag)}
												<Icon name="delete" />
											</Label>
										))}
									</Label.Group>
									<Input
										id="currentTag"
										className="addPost-tagInput"
										placeholder="Add tags here"
										value={this.state.currentTag}
										onChange={this.onChange}
										onKeyUp={this.onKeyUp}
										onKeyDown={this.onKeyDown}
									/>
								</Segment>
							</Form.Field>

							<Form.Field>
								<Message success header="Success" content="Posted!" />
							</Form.Field>

							<Form.Field
								as={Button}
								className="addPost-button"
								disabled={false}
								onClick={this.onSubmit}
								animated="vertical"
								size="big"
								primary
							>
								<Button.Content visible>Submit</Button.Content>
								<Button.Content hidden>
									<FontAwesomeIcon icon={['fas', 'check']} size="1x" />
								</Button.Content>
							</Form.Field>
						</Form>
					</Card.Content>
				</Card>
			</div>
		);
	}
}

export default AddPost;
