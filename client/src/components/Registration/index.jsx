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
      password: '',
      password2: '',
      errors: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state
    };
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
                <Input type="name" placeholder="Name" />
              </Form.Field>

              <Form.Field required>
                <label className="registration-field-text">Password</label>
                <Input type="password" placeholder="Password" />
              </Form.Field>

              <Form.Field required>
                <label className="registration-field-text">
                  Confirm Password
                </label>
                <Input type="password" placeholder="Confirm Password" />
              </Form.Field>

              <Form.Field required>
                <label className="registration-field-text">Gender</label>
                <Select options={genderOptions} placeholder="Gender" />
              </Form.Field>

              <Form.Field>
                <label className="registration-field-text">Avatar</label>
                <Input type="file" />
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
