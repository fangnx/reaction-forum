import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Label, Card, Grid, Button, Icon } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../App.css';
import './PostView.css';

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
	editIconLabel: { background: 'transparent', padding: 'none', float: 'right' },
	editIcon: { margin: '0' }
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
		console.log(this.props);

		if (this.state.shouldRedirect) {
			return <Redirect to="/post/edit" />;
		}
		return (
			<div className="postView-wrapper">
				<Card className="postView-card" fluid>
					<Card.Content className="postView-card-content">
						<Grid padded className="postView-card-grid">
							<Grid.Row columns={2} className="postView-author-field">
								<Grid.Column style={styles.column} width={14}>
									<Label
										as="a"
										size="large"
										color={
											tagColors[Math.floor(Math.random() * tagColors.length)]
										}
									>
										{this.props.author}
									</Label>
								</Grid.Column>

								<Grid.Column style={styles.column} width={2}>
									<Label size="large" style={styles.editIconLabel}>
										<Icon
											{...this.props}
											onClick={this.directToEditPost}
											name="edit"
											style={styles.editIcon}
										/>
									</Label>
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
export default PostView;

PostView.propTypes = {
	title: PropTypes.string
};
