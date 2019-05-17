import React from 'react'
import { withRouter } from  'react-router-dom';
import {  Divider, Grid, Container } from 'semantic-ui-react'
import Navigation from '../components/Navigation'

const HeaderContainer = props => {
  return (
    <>
      <Container style={{boxShadow: '2px 2px 7px 1px rgba(200,221,224,0.44)'}}>
      <Grid width={16} centered padded>
         <Navigation currentUser={props.currentUser} handleOpenModal={props.handleOpenModal} />
        
      </Grid>
      </Container>
      <Divider hidden />
       </>
  );
};

export default withRouter(HeaderContainer)
