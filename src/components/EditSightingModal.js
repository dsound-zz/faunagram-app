import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Modal, Image, Form } from 'semantic-ui-react'





class EditSightingModal extends Component {

  state = { openModal: false,
            title: '',
            body: '',
            animal: '',
            geotag: false
          };


  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value  })
  }

  submitForm = event => {
    event.preventDefault()
    this.props.editSighting( event, this.props.currentUser.id, this.state.animal, this.props.sighting.id )
    this.props.handleClose()
  };


  render() {
    return (

      <Modal
         open={this.props.modalOpen}
         onClose={this.props.handleClose}
         dimmer='blurring'
         size='large'
         closeIcon>

         <Modal.Header>Edit Sighting</Modal.Header>
        <Modal.Content style={{backgroundColor: 'white'}}>
        <Modal.Description>
            <Image src={`${process.env.API_URI}${this.props.currentUser.avatar}`} avatar/>
        <Form onSubmit={this.submitForm}>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Title' placeholder={this.props.sighting.title}
              onChange={this.handleChange} name='title'/>
                <Form.Select
                  fluid
                  onChange={this.handleChange}
                  placeholder='select animal'
                  label='Animal'
                  name='animal'
                  width={8}
                  selection
                  options={this.props && this.props.animals.map(animal => ({
                   name: animal.gname,
                   key: animal.id,
                   value: animal.id,
                   text: animal.gname
                 }))}
                 required />
              <Form.TextArea label='Body' name='body' value={this.props.sighting.body}
                onChange={this.handleChange}  />
              <Form.Checkbox label='post Geotag location (under development)' />
              <Form.Input type='file' name='image' />
              </Form.Group>
              <Form.Button type='submit' color='teal'>Submit</Form.Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
        </Modal>
      );
    };
};

export default withRouter(EditSightingModal);
