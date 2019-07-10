/**
 * Subforum.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-24 17:58:54
 * @last-modified 2019-07-09 21:51:15
 */

import React from 'react';
import { Segment } from 'semantic-ui-react';
import './Subforum.css';

const styles = {
	segment: {
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: '0px'
	},
	name: {
		width: '90%',
		margin: '0px auto 0px auto',
		textAlign: 'center'
	}
};

class Subforum extends React.Component {
	// constructor() {
	// 	super();
	// }

	render() {
		return (
			<div className="subforum">
				<Segment
					inverted
					color={this.props.color}
					className="subforum-segment"
					style={styles.segment}
				>
					<h1 style={styles.name}>{this.props.name}</h1>
				</Segment>
			</div>
		);
	}
}

export default Subforum;
