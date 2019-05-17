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
    fetch(`${process.env.REACT_APP_API_URI}/sightings/${this.props.sighting.id}/comments`, {
     method: 'POST',
     headers: {
       'Authorization': localStorage.getItem('token'),
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     },
     body: JSON.stringify({
       body: this.state.commentBody,
       user_id: this.props.currentUser.id,
       username: this.props.currentUser.username
     })
   })
   .then(r => r.json())
   .then(newComments => {
     this.setState({ comments:  [newComments, ...this.state.comments] , commentBody: '' })
   });
 };


 editComment = (body, commentId) => {
   fetch(`${process.env.REACT_APP_API_URI}/${this.props.sighting.id}/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        body: body,
        id: commentId,
        user_id: this.props.currentUser
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
   fetch(`${process.env.API_URI}/sightings/${this.props.sighting.id}/comments/${commentId}`, {
     method: 'DELETE',
     headers: {
       'Authorization': localStorage.getItem('token')
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
          <Image src={`${process.env.REACT_APP_API_URI}${this.props.sighting.image}`} alt={this.props.sighting.gname} />
            <Card.Content>


            <Image src={`${process.env.REACT_APP_API_URI}${this.props.sighting.user.avatar}`} alt={this.props.sighting.user.username} avatar />   <p>{this.props.sighting.user.username}</p>
                <Card.Header>{this.props.sighting.title}</Card.Header>
                <Card.Meta>{this.props.sighting.created_at}</Card.Meta>
                <Card.Description>{this.props.sighting.body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              {/* <Icon name='like' size='large' color='red' onClick={this.handleLikesClick}/> */}
                {/* <p>{this.state.likes}</p> */}
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
