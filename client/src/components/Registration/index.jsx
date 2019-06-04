import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Card,
  Form,
  Input,
  Dropdown,
  Message
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Registration.css';
import { registerUser } from '../../services/registerService';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'm' },
  { key: 'f', text: 'Female', value: 'f' },
  { key: 'o', text: 'Other', value: 'o' }
];

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      gender: '',
      password: '',
      passwordRe: '',
      checked: false,
      errors: {},
      success: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = (e, data) => {
    this.setState({ [data.id]: data.value });
  };

  onCheck = () => {
    this.setState({ checked: !this.state.checked });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      gender: this.state.gender,
      password: this.state.password,
      passwordRe: this.state.passwordRe
    };

    this.props.registerUser(newUser);
    const errors = this.state.errors;
    if (!errors) {
      this.setState({ success: true });
    }
  };

  render() {
    const errors = this.state.errors;
    const isSuccess = this.state.success;

    return (
      <div className="registration-wrapper">
        <Card className="registration-card" fluid>
          <Card.Header className="registration-card-header">
            <span>
              <h1>Register</h1>
            </span>
          </Card.Header>
          <Card.Content className="registration-card-content">
            <Form success={isSuccess} className="registration-form">
              <Form.Field error={!!errors.name} required>
                <label for="name" className="registration-field-text">
                  Name
                </label>
                <Input
                  id="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Name"
                />
                <span className="registration-field-msg">{errors.name}</span>
              </Form.Field>

              <Form.Field error={!!errors.email} required>
                <label for="email" className="registration-field-text">
                  Email
                </label>
                <Input
                  id="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="Email"
                />
                <span className="registration-field-msg">{errors.email}</span>
              </Form.Field>

              <Form.Field error={!!errors.password} required>
                <label for="password" className="registration-field-text">
                  Password
                </label>
                <Input
                  id="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
                <span className="registration-field-msg">
                  {errors.password}
                </span>
              </Form.Field>

              <Form.Field error={!!errors.passwordRe} required>
                <label for="passwordRe" className="registration-field-text">
                  Confirm Password
                </label>
                <Input
                  id="passwordRe"
                  value={this.state.passwordRe}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
                />
                <span className="registration-field-msg">
                  {errors.passwordRe}
                </span>
              </Form.Field>

              <Form.Field error={!!errors.gender} required>
                <label for="gender" className="registration-field-text">
                  Gender
                </label>
                <Dropdown
                  selection
                  search
                  id="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={genderOptions}
                  placeholder="Gender"
                />
                <span className="registration-field-msg">{errors.gender}</span>
              </Form.Field>

              <Form.Field>
                <label for="avatar" className="registration-field-text">
                  Avatar
                </label>
                <Input id="avatar" type="file" />
              </Form.Field>

              <Form.Field
                control={Checkbox}
                checked={this.state.checked}
                onClick={this.onCheck}
                label="I agree to the Terms and Conditions"
              />
              <Message
                success
                header="Success"
                content="You have registered successfully~"
              />
              <Form.Field
                as={Button}
                className="registration-button"
                disabled={!this.state.checked}
                onClick={this.onSubmit}
                animated="vertical"
                size="large"
                primary
              >
                <Button.Content visible>Submit</Button.Content>
                <Button.Content hidden>
                  {' '}
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

Registration.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser } // mapDispatchToProps
)(Registration);
