import React from 'react';
import UserCard from '../components/UserCard'


const UsersContainer = props => {
  return (
    <div>
      {props.users && props.users.map((user, idx) => {
        return <UserCard key={idx} user={user} />
      })
    }
    </div>
  );
};
export default UsersContainer
