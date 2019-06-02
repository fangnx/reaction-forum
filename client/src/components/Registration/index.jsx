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
      errors: {},
      success: false,
      failure: false
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
    // console.log(data.id + ' ' + data.value);
    this.setState({ [data.id]: data.value });
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

    console.log(newUser);
    this.props.registerUser(newUser);
    // if (regStatus === 200) {
    //   this.setState({ success: true });
    // } else {
    //   this.setState({ failure: true });
    // }
  };

  render() {
    const errors = this.state.errors;
    const isSuccess = this.state.success;
    const isError = this.state.failure;

    return (
      <div className="registration-wrapper">
        <Card className="registration-card" fluid>
          <Card.Header className="registration-card-header">
            <span>
              <h1>Register</h1>
            </span>
          </Card.Header>
          <Card.Content className="registration-card-content">
            <Form
              success={isSuccess}
              error={isError}
              className="registration-form"
            >
              <Form.Field required>
                <label className="registration-field-text">Name</label>
                <Input
                  id="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Name"
                  error={errors.name}
                />
                <span>{errors.name}</span>
              </Form.Field>

              <Form.Field required>
                <label className="registration-field-text">Email</label>
                <Input
                  id="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="Email"
                  error={errors.email}
                />
                <span>{errors.email}</span>
              </Form.Field>

              <Form.Field required>
                <label className="registration-field-text">Password</label>
                <Input
                  id="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                  error={errors.password}
                />
                <span>{errors.password}</span>
              </Form.Field>

              <Form.Field required>
                <label className="registration-field-text">
                  Confirm Password
                </label>
                <Input
                  id="passwordRe"
                  value={this.state.passwordRe}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
                  error={errors.passwordRe}
                />
                <span>{errors.passwordRe}</span>
              </Form.Field>

              <Form.Field required>
                <label className="registration-field-text">Gender</label>
                <Dropdown
                  selection
                  search
                  id="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={genderOptions}
                  placeholder="Gender"
                  error={errors.gender}
                />
                <span>{errors.gender}</span>
              </Form.Field>

              <Form.Field>
                <label className="registration-field-text">Avatar</label>
                <Input id="avatar" type="file" />
              </Form.Field>

              <Form.Field
                control={Checkbox}
                label="I agree to the Terms and Conditions"
              />
              <Message
                success
                header="Registration Form Completed"
                content="You have registered successfully~"
              />
              <Form.Field
                as={Button}
                className="registration-button"
                onClick={this.onSubmit}
                size="large"
                primary
              >
                Submit
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
