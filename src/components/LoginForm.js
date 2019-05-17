import React from 'react';
import { Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {

  state = {
    username: '',
    password: ''
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }


  submitForm = () => {
    this.props.login(this.state.username, this.state.password)
  };

  render() {
    return (
      <Form size='small' onSubmit={this.submitForm}>
        <Form.Field required>
           <label>Username</label>
           <Form.Input onChange={this.handleChange} name='username' placeholder='Username' width={6}/>
        </Form.Field>
        <Form.Field required>
           <label>Password</label>
           <Form.Input onChange={this.handleChange} type='password' name='password' placeholder='Password' width={6} />
        </Form.Field>
        <Button type='submit' color='teal'>Log In</Button>
        <Button as={Link} to={'/signup'} color='blue'>Sign Up</Button>
      </Form>
    );
  };
};


export default LoginForm;
