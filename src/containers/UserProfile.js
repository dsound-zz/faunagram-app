import React, { Component } from 'react';
import { withRouter, Link } from  'react-router-dom';
import { Button, Form, Image } from 'semantic-ui-react';



class UserProfile extends Component {
  state = {
    user: {},
    avatar: '',
    isHidden: true,
    name: '',
    username: '',
    password: '',
    passwordConfirmation: ''
  };

  editUserClick = (userId) => {
    this.setState({ isHidden: false })
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  submitUpdateProfile = (event) => {
    event.preventDefault()
    this.props.updateProfile(event, this.state.password, this.state.passwordConfirmation)
    this.setState({
      isHidden: true,
      user: {...this.props.currentUser, username: this.props.currentUser.username}
    });
  };

  submitDeleteProfile = (userId, event) => {
    event.preventDefault()
    this.props.deleteProfile(userId)
  };


  render() {
    
    return (

        // ******* USER FORM FOR SIGNUP *******
      <>
        <Image src={`${process.env.REACT_APP_BASE_URI}${this.props.currentUser.avatar}`} alt={this.props.currentUser.username} size='small' avatar/>
        <h2>My name is {this.props.currentUser.name}</h2>
        <h2>but you can call me {this.props.currentUser.username}. I like going for long walks in the park
          and spotting animals and taking photos of them and posting them on Faunagram.</h2><br />
        <Button color='blue' onClick={() => this.editUserClick(this.props.currentUser.id)}>Edit Profile</Button>
          {!this.state.isHidden &&
            <Form onSubmit={(event) => this.submitUpdateProfile(event)}>
              <Form.Field required>
                <Form.Input onChange={this.handleChange} name='username' placeholder='New username' width={12}/>
              </Form.Field>
              <Form.Field required>
                <Form.Input onChange={this.handleChange} type='password' name='password' placeholder='New password' width={12} />
              </Form.Field>
              <Form.Field required>
                <Form.Input onChange={this.handleChange} type='password' name='passwordConfirmation' placeholder='New password confirmation' width={12} />
              </Form.Field>

                <Form.Input type='file' name='avatar' />
                <Button color='orange' type='submit'>Submit</Button>
              <Button size='small' color='green' as={Link} to={`/home`}>cancel</Button>
            </Form>}
              <Button color='red' onClick={(event) => this.submitDeleteProfile(this.props.currentUser.id, event)}>Delete Profile</Button>
      </>
    );
  };
};

export default withRouter(UserProfile);
