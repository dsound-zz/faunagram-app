import React from 'react';
import { Comment } from 'semantic-ui-react'
import CommentCard from '../components/CommentCard'


const CommentsContainer = props => {


  return (
      <Comment.Group>
        {props.comments && props.comments.map((comment, idx) => {
          return <CommentCard key={idx} comment={comment}
            addComment={props.addComment}  currentUser={props.currentUser} deleteComment={props.deleteComment}
            newComments={props.newComments} editComment={props.editComment} />
          })
        }
      </Comment.Group>
    );
};

export default CommentsContainer
