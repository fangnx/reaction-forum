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
import { store } from '../../store';
import { logoutUser, checkAdmin } from '../../actions/userActions';
import UserLabel from './UserLabel';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon, Button } from 'semantic-ui-react';
import './Header.css';

const styles = {
	header: {
		borderRadius: '0px',
		height: '8vh'
	},
	dropdownMenu: {
		background: 'var(--theme-white-1)',
		marginTop: '2rem'
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
			userAvatar: '',
			isAdmin: false
		};
	}

	onLogout = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	async componentDidMount() {
		const authState = store.getState().auth;
		if (authState.isAuthenticated) {
			await checkAdmin({ email: authState.user.email }).then(async res => {
				if (res && res.data.isAdmin) {
					this.setState({
						isLoggedIn: true,
						isAdmin: true
					});
				} else {
					this.setState({
						isLoggedIn: true,
						isAdmin: false
					});
				}
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
				isLoggedIn: false,
				isAdmin: false
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

						<Menu.Item as={NavLink} to="/post/add" name="newPost">
							<Icon name="write" size="large" />
						</Menu.Item>
					</Menu.Menu>

					<Menu.Menu position="right" className="header-menu-rightmenu">
						{isLoggedIn ? (
							<React.Fragment>
								<Menu.Item>
									<Dropdown
										icon="null"
										pointing
										style={{ height: '35px' }}
										trigger={
											<UserLabel
												userName={this.props.auth.user.name}
												userAvatar={this.props.auth.user.avatar}
												transparent
												header
											/>
										}
									>
										<Dropdown.Menu style={styles.dropdownMenu}>
											<Dropdown.Header content="User" />

											<Dropdown.Item>
												<Icon name="address card outline" />
												View My User Info
											</Dropdown.Item>
											<Menu.Item as={NavLink} to="/myposts" name="myPosts">
												<Icon name="file alternate outline" />
												Manage My Posts
											</Menu.Item>

											<Dropdown.Header content="Admin" />
											<Dropdown.Item
												as={NavLink}
												disabled={!this.state.isAdmin}
												to="/subscribe"
												name="subscribe"
											>
												<Icon name="rss square" />
												Manage RSS Subscriptions
											</Dropdown.Item>
											<Dropdown.Item onClick={this.onLogout}>
												<Button
													size="tiny"
													secondary
													style={{ width: '100%', margin: '2px 0 2px 0' }}
												>
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
