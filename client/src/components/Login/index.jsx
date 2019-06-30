/**
 * index.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-02 16:17:26
 * @last-modified 2019-06-30 13:46:34
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Button,
	Card,
	Form,
	Input,
	Message,
	Transition
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css';
import { loginUser } from '../../actions/userActions';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {},
			success: false,
			visible: false
		};
	}

	componentDidMount() {
		this.setState({ visible: true });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
		}

		if (
			nextProps.errors &&
			Object.keys(nextProps.errors).length > 0 &&
			!nextProps.errors.loginSuccess
		) {
			this.setState({
				errors: nextProps.errors,
				success: false
			});
		} else if (nextProps.errors.loginSuccess) {
			this.setState({ errors: {}, success: true });
		}
	}

	onChange = (e, data) => {
		this.setState({ [data.id]: data.value });
	};

	onSubmit = async e => {
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(user);
	};

	render() {
		const errors = this.state.errors;
		const isSuccess = this.state.success;
		const { visible } = this.state;

		return (
			<div className="login-wrapper">
				<Transition visible={visible} duration={400} animation="scale">
					<Card className="login-card" fluid>
						<Card.Header className="login-card-header">
							<span>
								<h1>Login</h1>
							</span>
						</Card.Header>
						<Card.Content className="login-card-content">
							<Form success={isSuccess} className="login-form">
								<Form.Field error={!!errors.email} required>
									<label for="email" className="login-field-text">
										Email
									</label>
									<Input
										id="email"
										value={this.state.email}
										onChange={this.onChange}
										placeholder="Email"
									/>
									<span className="login-field-msg">{errors.email}</span>
								</Form.Field>

								<Form.Field error={!!errors.password} required>
									<label for="password" className="login-field-text">
										Password
									</label>
									<Input
										id="password"
										value={this.state.password}
										onChange={this.onChange}
										type="password"
										placeholder="Password"
									/>
									<span className="login-field-msg">{errors.password}</span>
								</Form.Field>

								<Message
									success
									header="Success"
									content="You have registered successfully~"
								/>

								<Form.Field
									as={Button}
									className="login-button"
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
				</Transition>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

const mapDispatchToProps = dispatch => ({
	loginUser: data => dispatch(loginUser(data))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
