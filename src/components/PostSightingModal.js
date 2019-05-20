import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {  Modal, Image, Form } from 'semantic-ui-react'




class PostSightingModal extends Component {

  state = { modalOpen: false,
            title: '',
            body: '',
            animal: '',
            geotag: false,
          };


  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () =>  {
    debugger
    this.props.history.push('/home')
  this.setState({ modalOpen: false })
}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  submitForm = event => {
    debugger
    this.props.postSighting( event, this.props.currentUser.id, this.state.animal )
    this.handleClose()
  };


  render() {
    return (
      <div>
      {this.props.currentUser ?
        <Modal
         open={this.props.openModal}
         onClose={this.props.closeModal}
         dimmer='blurring'
         basic
         size='large'
         >

       <Modal.Header>Post a Sighting</Modal.Header>
       <Modal.Content style={{backgroundColor: 'white'}}>
       <Modal.Description>
                <Image src={`${process.env.REACT_APP_BASE_URI}${this.props.currentUser.avatar}`} avatar/>
         <Form onSubmit={this.submitForm}>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Title' placeholder='Title'
              onChange={this.handleChange} name='title' required/>

              <Form.Select
                fluid
                onChange={this.handleChange}
                placeholder='select animal'
                label='Animal'
                name='animal'
                 size={4}
                 selection
                 options={this.props && this.props.animals.map(animal => ({
                   name: animal.gname,
                   key: animal.id,
                   value: animal.id,
                   text: animal.gname
                 }))}
              required />

              <Form.TextArea label='Body' placeholder="What'd you spot....?"
                onChange={this.handleChange} name='body' required/>
              <Form.Checkbox label='post Geotag location (under development)' />
              <Form.Input type='file' name='image' />
              </Form.Group>
              <Form.Button type='submit' color='teal'>Submit</Form.Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal> :  this.props.history.push('/login') }
      </div>
    );
  };
};

export default withRouter(PostSightingModal);
