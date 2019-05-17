import React from 'react';
import { withRouter } from 'react-router-dom';
import {  Container } from 'semantic-ui-react';
import SightingCard from '../components/SightingCard';



const SightingsContainer = props => {
  return (
    
      <Container>
        {props.sightings && props.sightings.map((sighting, idx) => {
         return <SightingCard key={idx} currentUser={props.currentUser} sighting={sighting}  users={props.users} animals={props.animals}
                  handleOpenModal={props.handleOpenModal} editSighting={props.editSighting}
                    likeSighting={props.likeSighting} postSighting={props.postSighting} deleteSighting={props.deleteSighting} />
        })
      }
      </Container>

    
  );
};
export default withRouter(SightingsContainer)
