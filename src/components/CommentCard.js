import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Comment, Icon, Form, Button} from 'semantic-ui-react';

class CommentCard extends Component {

  state = {
          comment: this.props.comment,
          body: "",
          showForm: false
      };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  openForm = event => {
    this.setState(prevState => ({
    showForm: !prevState.showForm })
    );
  };

  handleEditComment = () => {
    this.props.editComment(this.state.body, this.state.comment.id )
    this.setState({ showForm: false })
  };

  handleDeleteComment = () => {
    alert("Are you sure?")
    this.props.deleteComment(this.props.comment.id)
  };


  render() {
    return (

      <Comment.Group>
        <Comment>
          <Comment.Content>
            <Comment.Author>{this.props.comment.username}</Comment.Author>
            <Comment.Metadata>
              {this.props.comment.created_at}
            </Comment.Metadata>
            <Comment.Text>
              {this.props.comment.body}
            </Comment.Text>
              {this.props.currentUser.id === this.props.comment.user_id ?
            <Comment.Actions>
              <Comment.Action>
                <Icon name='delete' size="small" onClick={this.handleDeleteComment} />
              </Comment.Action>
              <Comment.Action>
                <Icon name="edit" size="small"   onClick={this.openForm} />
              </Comment.Action>
              </Comment.Actions>
                : null }
              {this.state.showForm ?
                <Form reply>
                  <Form.Input name="body" onChange={this.handleChange}/>
                  <Button onClick={this.handleEditComment} color='blue' content='update comment' primary />
                </Form>
                : null }
            </Comment.Content>
          </Comment>
      </Comment.Group>
    );
  };
};

export default withRouter(CommentCard);
