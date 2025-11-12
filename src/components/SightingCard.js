import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Image, Form, Card, Button, Grid, Divider} from 'semantic-ui-react';
import CommentsContainer from '../containers/CommentsContainer';
import EditSightingModal from './EditSightingModal';


class SightingCard extends Component {

  state = { modalOpen: false,
            title: '',
            body: '',
            animal: '',
            geotag: false,
            sightingId: '',
            likes: 0,
            image: '',
            commentBody: '',
            showComments: false,
            comments: []
        };


  componentDidMount() {
    this.setState({ likes: this.props.sighting.likes, comments: this.props.sighting.comments && this.props.sighting.comments.reverse() })
  };

  showComments = (event) => {
    this.setState(prevState => ({
      showComments: !prevState.showComments })
    )
  };


  handleOpen = (sightingID) => {
  this.setState({ sightingId: sightingID , modalOpen: true, })
  };

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  submitEditSightingData = (event) => {
    this.props.handleOpenModal(this.state.title, this.state.body,
      this.state.animal, this.state.sightingId)
  };

  handleDeleteClick = () => {
    alert('Delete this sighting...are you sure?')
    this.props.deleteSighting(this.props.sighting.id)
  };


  handleLikesClick = () => {
    this.props.likeSighting(this.props.sighting.id, this.props.sighting.likes)
    this.setState({ likes: this.state.likes + 1 })
  };


  addComment = (event) => {
    event.preventDefault()
     fetch(`${process.env.REACT_APP_API_URI}/comments`, {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`,
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     },
     body: JSON.stringify({
       body: this.state.commentBody,
       commentable_type: 'Sighting',
       commentable_id: this.props.sighting.id,
       username: this.props.currentUser.username
     })
   })
   .then(r => r.json())
   .then(newComments => {
     this.setState({ comments:  [newComments, ...this.state.comments] , commentBody: '' })
   });
 };


 editComment = (body, commentId) => {
   fetch(`${process.env.REACT_APP_API_URI}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        body: body
      })
    })
    .then(r => r.json())
    .then(updatedComments => {
      const commentsCopy = this.props.sighting.comments.slice()
      const foundOldComments = commentsCopy.findIndex(comment => comment.id === commentId);
      commentsCopy.splice(foundOldComments, 1, updatedComments)
      this.setState({ comments: commentsCopy  })
    });
 }


 deleteComment = (commentId) => {
   fetch(`${process.env.REACT_APP_API_URI}/comments/${commentId}`, {
     method: 'DELETE',
     headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     }
  })
    const commentsCopy = this.state.comments.slice()
    const foundOldComment = commentsCopy.findIndex(comment => comment.id === commentId);
    commentsCopy.splice(foundOldComment, 1)
    this.setState({ comments: commentsCopy })
  };

  handleLikesClick = (e) => {
    e.preventDefault()
    this.props.likeSighting(this.state.likes, this.props.sighting.id)
    this.setState({ likes: this.state.likes + 1})
  }
// 
  // findSightingUser = () => {
    // const foundUser = this.props.users.find(user => {
      // return user.id === this.props.sighting.user_id
    // })
  // };


  render() {
    console.log(this.props.sighting)
    return (

        <Grid padded centered divided>

        <Card value={this.props.sighting.id}>
          {this.props.sighting.image_url ? (
            <Image src={this.props.sighting.image_url} alt={this.props.sighting.title || 'Sighting'} />
          ) : (
            <Image src="https://via.placeholder.com/400x300?text=No+Image" alt="No image" />
          )}
            <Card.Content>


            {this.props.sighting.user && (
              <>
                {this.props.sighting.user.avatar_url ? (
                  <Image src={this.props.sighting.user.avatar_url} alt={this.props.sighting.user.username} avatar />
                ) : (
                  <Image src="https://via.placeholder.com/40?text=U" alt={this.props.sighting.user.username} avatar />
                )}
                <p style={{ display: 'inline-block', marginLeft: '0.5rem', fontWeight: '600' }}>
                  {this.props.sighting.user.username || this.props.sighting.user.name}
                </p>
              </>
            )}
                <Card.Header>{this.props.sighting.title}</Card.Header>
                <Card.Meta>{this.props.sighting.created_at}</Card.Meta>
                <Card.Description>{this.props.sighting.body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={this.handleLikesClick}>
                <Icon name='like' size='large' color='red' />
                <p style={{ margin: 0, fontWeight: '600', color: '#e74c3c', fontSize: '1.1rem' }}>{this.state.likes || 0}</p>
              </div>
            </Card.Content>
              {this.props.currentUser.id === this.props.sighting.user_id ?
            <Card.Content>
              <Icon name='edit' size='large' onClick={this.handleOpen} />
                <EditSightingModal modalOpen={this.state.modalOpen} handleClose={this.handleClose} animals={this.props.animals}
                  sighting={this.props.sighting} currentUser={this.props.currentUser}
                  editSighting={this.props.editSighting}/>
              <Icon name='delete' onClick={() => this.handleDeleteClick()} size='large'/>
            </Card.Content>
              : null }
            <Card.Content>
            <Button icon size='small'>
              <Icon name='comment alternate' value='true' size='large' onClick={this.showComments} />
            </Button>
              {this.state.showComments ?
              <Form onSubmit={this.addComment}>
                <Form.TextArea name='commentBody' onChange={this.handleChange}
                  value={this.state.commentBody}/>
                <Form.Button type='submit' color='blue'>submit</Form.Button>
                  <CommentsContainer comments={this.state.comments} addComment={this.addComment}
                  deleteComment={this.deleteComment} editComment={this.editComment} currentUser={this.props.currentUser}/>
                </Form>
                  : null }
            </Card.Content>
            </Card>
            <Divider horizontal hidden/>
            </Grid>




    )
  };
};

  export default withRouter(SightingCard);
