import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';



class UserCard extends Component {
  state = {
    images: []
  };

  render() {
    return (
      <Card centered>
        <Image src={`${process.env.REACT_APP_API_URI}${this.props.user.avatar}`} alt={this.props.user.username} avatar />
        <Card.Content>
          <Card.Header>{this.props.user.username}</Card.Header>
          <Card.Meta>{this.props.user.created_at}</Card.Meta>
          <Card.Description>Likes musical theater and long walks and row boating in Central Park</Card.Description>
        </Card.Content>
      </Card>
    );
  };
};

export default withRouter(UserCard);
