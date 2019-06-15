import React from 'react';
import PropTypes from 'prop-types';
import { Image, Label, Card, Grid, Divider, Header } from 'semantic-ui-react';
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

class PostView extends React.Component {
	capitalizeTag(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	render() {
		console.log(this.props);
		return (
			<div className="postView-wrapper">
				<Card className="postView-card" fluid>
					<Card.Header className="postView-card-header">
						<Label as="a" size="large" image>
							<Image src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg" />
							<span>
								{this.props.author} &nbsp;&nbsp;
								{/* <i class="france flag" /> */}
							</span>
						</Label>
					</Card.Header>

					<Card.Content className="postView-card-content">
						<Grid padded className="postView-card-grid">
							<Grid.Row className="postView-title-field">
								{this.props.title}
							</Grid.Row>
							<Grid.Row className="postView-content-field">
								{this.props.content}}
							</Grid.Row>
						</Grid>

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
							<Divider hidden />
						</Grid.Row>

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
