import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class SignupForm extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    passwordConfirmation: ''
  };

  handlechange = (e, { name, value }) => this.setState({ [name]: value })

  submitForm = () => {
    this.props.signup(this.state.name, this.state.username, this.state.password,
    this.state.passwordConfirmation)
  };

  render() {
    return (

      <Form size='small' onSubmit={this.submitForm}>
        <Form.Field required>
          <label>Name</label>
          <Form.Input onChange={this.handlechange} name='name' placeholder='Name' width={6} />
        </Form.Field>
        <Form.Field required>
          <label>Username</label>
          <Form.Input onChange={this.handlechange} name='username' placeholder='Username' width={6} />
        </Form.Field>
        <Form.Field required>
          <label>Password</label>
          <Form.Input onChange={this.handlechange} type='password' name='password' placeholder='Password' width={6} />
        </Form.Field>
        <Form.Field required>
          <label>Confirm Password</label>
          <Form.Input onChange={this.handlechange} type='password' name='passwordConfirmation' placeholder='Password Confirmation' width={6}/>
        </Form.Field>
        <Button type='submit' color='teal'>Sign Up!</Button>
      </Form>
    );
  };
};



export default SignupForm;
