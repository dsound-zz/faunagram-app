import React, { Component } from 'react';
import { Card, Image, Modal } from 'semantic-ui-react'


class AnimalCards extends Component {

  render() {
    return (

      <Card.Group centered>
        <Card>
          <Card.Content>

          <Card.Header><h2>{this.props.animal.gname}</h2></Card.Header>
            <Modal trigger={<Image src={this.props.animal.image} />} centered={false}>
                <Modal.Content>
                  <Modal.Description>
                  <Image src={this.props.animal.image} />
                  <Card.Description>phylum: {this.props.animal.phylum}</Card.Description>
                  <Card.Description>order: {this.props.animal.order}</Card.Description>
                  <Card.Description>family: {this.props.animal.family}</Card.Description>
                  <Card.Description>species: {this.props.animal.species}</Card.Description>
                  <Card.Description>class: {this.props.animal.cls}</Card.Description>
                  <Card.Description>Description: {this.props.animal.description}</Card.Description>

                  </Modal.Description>
                </Modal.Content>
              </Modal>
          </Card.Content>
        </Card>
      </Card.Group>

    );
  };
};
export default AnimalCards;
