import React from 'react'
import { withRouter } from  'react-router-dom';
import {  Divider, Grid, Container } from 'semantic-ui-react'
import Navigation from '../components/Navigation'

const HeaderContainer = props => {
  return (
    <>
      <Container style={{boxShadow: '4px 4px 7px 2px rgba(200,221,224,0.44)'}}>
      <Grid width={16} centered padded>
         <Navigation currentUser={props.currentUser} handleOpenModal={props.handleOpenModal} />
        
      </Grid>
      </Container>
      <Divider hidden />
       </>
  );
};

export default withRouter(HeaderContainer)
