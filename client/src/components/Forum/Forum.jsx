/**
 * Forum.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-08 00:17:05
 * @last-modified 2019-07-08 23:00:53
 */

import React from 'react';
import Subforum from './Subforum';
import { getAllSubforums } from '../../actions/forumActions';
import { TAG_COLORS_SOFT } from '../../utils/commonUtils';

class Forum extends React.Component {
	constructor() {
		super();
		this.state = {
			subforums: [1]
		};
	}

	getAllSubforums = async () => {
		await getAllSubforums().then(async res => {
			if (res.data) {
				await this.setState({ subforums: res.data.map(subforum => subforum) });
			}
		});
	};

	componentDidMount = async () => {
		await this.getAllSubforums();
		console.log(this.state.subforums[0].name);
	};

	render() {
		return (
			<div className="forum">
				{this.state.subforums.length
					? this.state.subforums.map((subforum, index) => (
							<Subforum
								key={'subforum-' + index}
								color={TAG_COLORS_SOFT[index % TAG_COLORS_SOFT.length]}
								name={subforum.name}
							/>
					  ))
					: {}}
				;
			</div>
		);
	}
}

export default Forum;
