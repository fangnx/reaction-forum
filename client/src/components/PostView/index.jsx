import React from 'react';
import { withRouter } from 'react-router-dom';
import { Label, Card, Grid, Icon, Menu } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../App.css';
import './PostView.css';
import EditPost from '../EditPost';

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

const styles = {
	column: {
		paddingLeft: '0',
		paddingRight: '0'
	},
	iconGroup: { background: 'transparent', padding: 'none', float: 'right' },
	icon: { margin: '0' }
};

class PostView extends React.Component {
	constructor() {
		super();
		this.state = { shouldRedirect: false };
		this.directToEditPost = this.directToEditPost.bind(this);
	}

	capitalizeTag(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	directToEditPost() {
		this.setState({ shouldRedirect: true });
	}

	render() {
		if (this.state.shouldRedirect) {
			this.props.history.push({
				pathname: '/post/edit',
				state: {
					pid: this.props.pid,
					title: this.props.title,
					content: this.props.content,
					timeStamp: this.props.timeStamp,
					tags: this.props.tags
				}
			});
		}
		return (
			<div className="postView-wrapper">
				<Card className="postView-card" fluid>
					<Card.Content className="postView-card-content">
						<Grid padded className="postView-card-grid">
							<Grid.Row columns={2}>
								<Grid.Column style={styles.column} width={14}>
									<Label as="a" size="large" color="grey">
										{this.props.author}
									</Label>
								</Grid.Column>

								<Grid.Column style={styles.column} width={2}>
									{this.props.canManage ? (
										<div style={styles.iconGroup}>
											<Icon
												size="large"
												onClick={this.directToEditPost}
												name="pencil"
												style={styles.icon}
											/>
											&nbsp;
											<Icon
												size="large"
												onClick={this.directToEditPost}
												name="close"
												color="red"
												style={styles.icon}
											/>
										</div>
									) : (
										''
									)}
								</Grid.Column>
							</Grid.Row>
							<hr className="postView-card-divider" />

							<Grid.Row className="postView-title-field">
								{this.props.title}
							</Grid.Row>
							<hr className="postView-card-divider" />

							<Grid.Row className="postView-content-field">
								{this.props.content}}
							</Grid.Row>
							<hr className="postView-card-divider" />

							<Grid.Row className="postView-tags-field">
								<Label.Group size="medium" className="postView-tagList">
									{this.props.tags.map((tag, index) => (
										<Label
											className="postView-tag"
											color={tagColors[index % tagColors.length]}
										>
											{this.capitalizeTag(tag)}
										</Label>
									))}
								</Label.Group>
							</Grid.Row>
						</Grid>

						{/* <Grid.Row>
							<span className="postView-viewCount-field">
								<label>Viewed: {this.props.viewCount}</label>
							</span>
							<span className="postView-likeCount-field">
								<label>Liked: {this.props.likeCount}</label>
							</span>
						</Grid.Row> */}
					</Card.Content>
				</Card>
			</div>
		);
	}
}
export default withRouter(PostView);
