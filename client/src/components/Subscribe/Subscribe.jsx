/**
 * Subscribe.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-04 19:49:48
 * @last-modified 2019-07-04 22:57:16
 */

import React from 'react';
import Radium from 'radium';
import { Label, Card, Form, Input, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { subscribeToSource } from '../../actions/rssSourceActions';

const styles = {
	wrapper: {
		width: '60%',
		minWidth: '500px',
		margin: '0 auto'
	},
	card: {
		background: 'rgba(240, 240, 240, 96%)',
		borderRadius: '3px'
	},
	cardContent: {
		width: '100%',
		margin: '0 auto'
	}
};

class Subscribe extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			sourceUrl: '',
			description: '',
			category: '',
			avatar: '',
			success: false
		};
	}

	componentDidMount() {}

	onChange = (e, data) => {
		this.setState({ [data.id]: data.value });
	};

	onSubmit = async e => {
		e.preventDefault();
		const newSource = {
			name: this.state.name,
			sourceUrl: this.state.sourceUrl,
			description: this.state.description,
			category: this.state.category,
			avatar: this.state.avatar
		};
		console.log(newSource);
		await subscribeToSource(newSource);
	};

	render() {
		return (
			<div style={styles.wrapper}>
				<Card style={styles.card} fluid>
					<Card.Content style={styles.cardContent}>
						<Form success={this.state.Success}>
							<Form.Field>
								<Input
									id="name"
									value={this.state.name}
									onChange={this.onChange}
									placeholder="Source Name"
								/>
							</Form.Field>

							<Form.Field>
								<Input
									id="sourceUrl"
									value={this.state.sourceUrl}
									onChange={this.onChange}
									placeholder="URL of the source"
								/>
							</Form.Field>

							<Form.Field>
								<Input
									id="description"
									value={this.state.description}
									onChange={this.onChange}
									placeholder="Some description of the subscription ;)"
								/>
							</Form.Field>

							<Form.Field>
								<Input
									id="category"
									value={this.state.category}
									onChange={this.onChange}
									placeholder="Source Category (News, Tech, Music, ...)"
								/>
							</Form.Field>

							<Form.Field
								as={Button}
								className="registration-button"
								onClick={this.onSubmit}
								animated="vertical"
								size="large"
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

export default Subscribe;
