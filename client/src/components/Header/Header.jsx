/**
 * Header.jsx
 * @author fangnx
 * @description
 * @created 2019-05-02T20:29:23.164Z-04:00
 * @copyright
 * @last-modified 2019-06-24T18:01:07.201Z-04:00
 */

import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon, Button } from 'semantic-ui-react';
import './Header.css';

import { logoutUser } from '../../actions/userActions';
import { store } from '../../store';
import UserLabel from './UserLabel';

const styles = {
	header: {
		borderRadius: '0px',
		height: '8vh'
	},
	dropdownMenu: {
		marginTop: '30px',
		background: 'rgba(245, 245, 245, 1)'
	},
	icon: {
		width: '100%'
	}
};
class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoggedIn: false,
			userName: '',
			userAvatar: ''
		};
	}

	onLogout = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	componentDidMount() {
		if (store.getState().auth.isAuthenticated) {
			this.setState({
				isLoggedIn: true
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.setState({
				isLoggedIn: true
			});
		} else {
			this.setState({
				isLoggedIn: false
			});
		}
	}

	render() {
		const { isLoggedIn } = this.state;

		return (
			<HashRouter>
				<Menu inverted borderless style={styles.header} className="header-menu">
					<Menu.Menu position="left">
						<Menu.Item as={NavLink} to="/forum" name="main">
							<Icon name="newspaper" size="large" style={styles.icon} />
						</Menu.Item>

						<Menu.Item as={NavLink} to="/" exact name="allPosts">
							<Icon name="newspaper outline" size="large" />
						</Menu.Item>

						<Menu.Item as={NavLink} to="/subscribe" name="newPost">
							<Icon name="rss" size="large" />
						</Menu.Item>

						<Menu.Item as={NavLink} to="/post/add" name="newPost">
							<Icon name="file text" size="large" />
							<Icon corner name="add" />
						</Menu.Item>
					</Menu.Menu>

					<Menu.Menu position="right" className="header-menu-rightmenu">
						{isLoggedIn ? (
							<React.Fragment>
								<Menu.Item>
									<UserLabel
										userName={this.props.auth.user.name}
										userAvatar={this.props.auth.user.avatar}
									/>
									<Dropdown icon="dropdown" pointing>
										<Dropdown.Menu style={styles.dropdownMenu}>
											<Dropdown.Header icon="user outline" content="	User" />

											<Dropdown.Item>View My User Info</Dropdown.Item>
											<Menu.Item as={NavLink} to="/myposts" name="myPosts">
												Manage My Posts
											</Menu.Item>

											<Dropdown.Header icon="computer" content="	Admin" />
											<Dropdown.Item
												as={NavLink}
												to="/subscribe"
												name="subscribe"
											>
												Manage Subscriptions
											</Dropdown.Item>
											<Dropdown.Item onClick={this.onLogout}>
												<Button size="tiny" secondary style={{ width: '100%' }}>
													Log Out
												</Button>
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</Menu.Item>
							</React.Fragment>
						) : (
							<React.Fragment>
								<Menu.Item as={NavLink} to="/register" name="register">
									REGISTER
								</Menu.Item>

								<Menu.Item as={NavLink} to="/login" name="login">
									LOG IN
								</Menu.Item>
							</React.Fragment>
						)}
					</Menu.Menu>
				</Menu>
			</HashRouter>
		);
	}
}

Header.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Header);
