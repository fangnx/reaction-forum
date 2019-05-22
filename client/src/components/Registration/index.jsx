import React from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  TextArea
} from 'semantic-ui-react';

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
      <Form>
        <Form.Field required control={Input} label="Name" placeholder="Name" />
        <Form.Field
          required
          control={Input}
          label="Password"
          placeholder="Password"
        />
        <Form.Field
          required
          control={Input}
          label="Confirm Password "
          placeholder="Confirm password"
        />
        <Form.Field
          required
          control={Select}
          label="Gender"
          options={genderOptions}
          placeholder="Gender"
        />
        <Form.Field control={Input} type="file" label="Avatar" />
        <Form.Field control={TextArea} label="About" placeholder="......" />
        <Form.Field
          required
          control={Checkbox}
          label="I agree to the Terms and Conditions"
        />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    );
  }
}

export default Registration;
