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
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';
import { logoutUser } from '../../actions/userActions';
import { store } from '../../store';
import UserLabel from './UserLabel';

const styles = {
	dropdownMenu: {
		marginRight: '20px',
		marginTop: '25px',
		background: 'rgba(245, 245, 245, 0.9)'
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
		console.log(nextProps.auth);
		if (nextProps.auth.isAuthenticated) {
			this.setState({
				isLoggedIn: true
			});
		} else {
			this.setState({
				isLoggedIn: false
			});
		}
		console.log(this.state);
	}

	render() {
		const { isLoggedIn } = this.state;

		return (
			<HashRouter>
				<Menu inverted borderless className="header-menu">
					<Menu.Menu>
						<Menu.Item as={NavLink} to="/forum" name="main">
							<FontAwesomeIcon icon={['fas', 'water']} size="2x" />
						</Menu.Item>

						<Menu.Item as={NavLink} to="/" exact name="addPost">
							ALL POSTS
						</Menu.Item>

						<Menu.Item as={NavLink} to="/myposts" name="addPost">
							MY POSTS
						</Menu.Item>

						<Menu.Item as={NavLink} to="/post/add" name="addPost">
							NEW POST
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

									<Icon
										as={Dropdown}
										name="dropdown"
										style={{ background: 'none' }}
									>
										<Dropdown.Menu direction="left" style={styles.dropdownMenu}>
											<Dropdown.Item>View User Info</Dropdown.Item>
											<Dropdown.Item onClick={this.onLogout}>
												Log Out
											</Dropdown.Item>
										</Dropdown.Menu>
									</Icon>
								</Menu.Item>
							</React.Fragment>
						) : (
							<React.Fragment>
								<Menu.Item
									as={NavLink}
									to="/registration"
									name="register"
									color="teal"
								>
									REGISTER
								</Menu.Item>

								<Menu.Item as={NavLink} to="/login" name="login" color="teal">
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
