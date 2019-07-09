/**
 * Forum.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-08 00:17:05
 * @last-modified 2019-07-09 01:13:55
 */

import React from 'react';
import { connect } from 'react-redux';
import Subforum from './Subforum';
import { getAllSubforums } from '../../actions/forumActions';
import { TAG_COLORS_SOFT } from '../../utils/commonUtils';

class Forum extends React.Component {
	constructor() {
		super();
		this.state = {
			subforums: [''],
			shouldEnterSubforum: false,
			subforumSelected: ''
		};
	}

	getAllSubforums = async () => {
		await getAllSubforums().then(async res => {
			if (res.data) {
				await this.setState({ subforums: res.data.map(subforum => subforum) });
			}
		});
	};

	enterSubforum = subforum => {
		this.setState({
			shouldEnterSubforum: true,
			subforumSelected: subforum
		});
	};

	componentDidMount = async () => {
		await this.getAllSubforums();
	};

	render() {
		if (this.state.shouldEnterSubforum) {
			this.props.dispatch({
				type: 'SUBFORUM',
				payload: { name: this.state.subforumSelected }
			});
			this.props.history.push({
				pathname: `/subforum/${this.state.subforumSelected
					.trim()
					.replace(/ /g, '')
					.toLowerCase()}`
			});
		}

		return (
			<div className="forum">
				{this.state.subforums.length
					? this.state.subforums.map((subforum, index) => (
							<div onClick={() => this.enterSubforum(subforum.name)}>
								<Subforum
									key={'subforum-' + index}
									color={TAG_COLORS_SOFT[index % TAG_COLORS_SOFT.length]}
									name={subforum.name}
								/>
							</div>
					  ))
					: {}}
				;
			</div>
		);
	}
}

export default connect()(Forum);
