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
  state = {};

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
          <Card.Content>
            <Form className="registration-form">
              <Form.Field
                required
                control={Input}
                label="Name"
                placeholder="Name"
              />

              <Form.Field required>
                <label className="registration-field-text">Password</label>
                <Input type="password" placeholder="Password" />
              </Form.Field>

              <Form.Field required>
                <label>Confirm Password</label>
                <Input type="password" placeholder="Confirm Password" />
              </Form.Field>

              <Form.Field
                required
                control={Select}
                label="Gender"
                options={genderOptions}
                placeholder="Gender"
              />
              <Form.Field control={Input} type="file" label="Avatar" />
              <Form.Field
                control={TextArea}
                label="About"
                placeholder="......"
              />
              <Form.Field
                required
                control={Checkbox}
                label="I agree to the Terms and Conditions"
              />
              <Form.Field as={Button} primary>
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
