/**
 * Forum.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-08 00:17:05
 * @last-modified 2019-07-12 00:30:51
 */

import React from 'react';
import { connect } from 'react-redux';
import { AnimationStyles } from '../../animations';
import { StyleRoot } from 'radium';

import Subforum from './Subforum';
import { getAllSubforums } from '../../actions/forumActions';
import {
	SHADES_OF_GREEN,
	mapStringToArbitraryNumber
} from '../../utils/commonUtils';

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
			<StyleRoot>
				<div style={AnimationStyles.fadeIn} className="forum">
					{this.state.subforums.length
						? this.state.subforums.map((subforum, index) => (
								<div onClick={() => this.enterSubforum(subforum.name)}>
									<Subforum
										key={'subforum-' + index}
										color={
											SHADES_OF_GREEN[
												mapStringToArbitraryNumber(
													subforum.name,
													SHADES_OF_GREEN.length
												)
											]
										}
										name={subforum.name}
									/>
								</div>
						  ))
						: {}}
					;
				</div>
			</StyleRoot>
		);
	}
}

export default connect()(Forum);
