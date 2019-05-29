import React from 'react';
import {
  Button,
  Checkbox,
  Card,
  Form,
  Input,
  Select,
  TextArea
} from 'semantic-ui-react';
import './Registration.css';
import { registerUser } from '../../services/registerService';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' }
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
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
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
    registerUser(newUser);
  };

  handleChange = (e, { value }) => this.setState({ value });
  render() {
    const { value } = this.state;
    return (
      <div className="registration-wrapper">
        <Card className="registration-card" fluid>
          <Card.Header className="registration-card-header">
            <span>
              <h1>Register</h1>
            </span>
          </Card.Header>
          <Card.Content className="registration-card-content">
            <Form className="registration-form">
              <Form.Field required>
                <label className="registration-field-text">Name</label>
                <Input
                  id="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Name"
                />
              </Form.Field>

              <Form.Field required>
                <label className="registration-field-text">Email</label>
                <Input
                  id="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="Email"
                />
              </Form.Field>

              <Form.Field required>
                <label className="registration-field-text">Password</label>
                <Input
                  id="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
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
                />
              </Form.Field>

              <Form.Field required>
                <label className="registration-field-text">Gender</label>
                <Select
                  id="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={genderOptions}
                  placeholder="Gender"
                />
              </Form.Field>

              <Form.Field>
                <label className="registration-field-text">Avatar</label>
                <Input id="avatar" type="file" />
              </Form.Field>

              <Form.Field
                control={Checkbox}
                label="I agree to the Terms and Conditions"
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

export default Registration;
