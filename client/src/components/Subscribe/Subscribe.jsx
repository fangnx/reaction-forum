/**
 * Subscribe.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-04 19:49:48
 * @last-modified 2019-09-11 12:00:34
 */

import React from 'react';
import { Label, Card, Grid, Input, Select, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimationStyles } from '../../animations';
import { StyleRoot } from 'radium';

import { getAllSubforums } from '../../actions/forumActions';
import { subscribeToSource } from '../../actions/rssSourceActions';
import { mergeStyles } from '../../utils/commonUtils';

const styles = {
	wrapper: {
		width: '100%',
		margin: '0 auto'
	},
	card: {
		background: 'var(--theme-white-t)'
	},
	cardContent: {
		width: '100%',
		margin: '0 auto'
	},
	field: {
		marginTop: '15px',
		width: '100%',
		background: 'var(--theme-white)',
		border: '1px solid #ddd',
		boxShadow: 'none'
	},
	label: {
		background: 'var(--theme-blue)',
		color: 'var(--theme-white)'
	}
};

class Subscribe extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			sourceUrl: '',
			description: '',
			subforum: '',
			avatar: '',
			subforumOpts: [],
			success: false
		};
	}

	getSubforums = async () => {
		getAllSubforums().then(async res => {
			const subforumNames = res.data.map(subforum => subforum.name);
			await this.setState({
				subforumOpts: subforumNames.map(name => ({
					value: name,
					text: name
				}))
			});
		});
	};

	async componentDidMount() {
		await this.getSubforums();
	}

	onChange = (e, data) => {
		this.setState({ [data.id]: data.value });
	};

	onSubmit = async e => {
		e.preventDefault();
		const newSource = {
			name: this.state.name,
			sourceUrl: this.state.sourceUrl,
			description: this.state.description,
			subforum: this.state.subforum,
			avatar: this.state.avatar
		};
		console.log(newSource);
		await subscribeToSource(newSource);
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
										Source Name
									</Label>

									<Input
										id="name"
										value={this.state.name}
										onChange={this.onChange}
										placeholder="Source Name"
										style={styles.field}
									/>
								</Grid.Row>

								<Grid.Row>
									<Label style={styles.label} size="large">
										Source URL
									</Label>

									<Input
										id="sourceUrl"
										value={this.state.sourceUrl}
										onChange={this.onChange}
										placeholder="URL of the source"
										style={styles.field}
									/>
								</Grid.Row>

								<Grid.Row>
									<Label style={styles.label} size="large">
										Description
									</Label>

									<Input
										id="description"
										value={this.state.description}
										onChange={this.onChange}
										placeholder="Some description of the subscription ;)"
										style={styles.field}
									/>
								</Grid.Row>

								<Grid.Row>
									<Label style={styles.label} size="large">
										Subforum
									</Label>

									<Select
										id="subforum"
										options={this.state.subforumOpts}
										value={this.state.subforum}
										onChange={this.onChange}
										style={styles.field}
									/>
								</Grid.Row>

								<Grid.Row>
									<Button
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

export default Subscribe;
