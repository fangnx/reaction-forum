import React from 'react';
import Radium from 'radium';
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
import dateFormat from 'dateformat';
import { store } from '../../store';

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
			title: '',
			content: '',
			author: '',
			authorEmail: '',
			timeStamp: '',
			tags: [],
			currentTag: '',
			success: false
		};
	}

	componentDidMount() {}

	onSubmit = async e => {};

	render() {
		return (
			<div style={styles.wrapper}>
				<Card style={styles.card} fluid>
					<Card.Content style={styles.cardContent}>
						<Grid padded />
					</Card.Content>
				</Card>
			</div>
		);
	}
}

export default Subscribe;
