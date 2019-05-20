
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon, Image, Header } from 'semantic-ui-react';


class Navigation extends Component {

  state = { modalOpen: false,
            title: '',
            body: '',
            animal: '',
            geotag: false,
          };

  render () {
    console.log(this.props)
    return (
      <>
      <Header  size="huge" className="monoton" textAlign='center'
        as={Link} to={this.props.currentUser ? '/home' : '/login'}><h1>Faunagram</h1>
        <h3><i>all things urban wildlife</i></h3>
      </Header>
      <Menu floadted="true" secondary>
        <Menu.Item header>
        <Menu.Menu position='left' as={Link} to={'/users'}>

          <Icon name='users' size='huge' color='black'/>
         
        </Menu.Menu>

        <Menu.Menu position='right' as={Link} to={'/animals'}>
          <Icon name='paw' size='huge' color='black'/>
        </Menu.Menu>
        <Menu.Menu position='right' as={Link} to={'/postSighting'} onClick={this.props.handleOpenModal}>
          <Icon name='camera retro' size='huge' color='black'/>
        </Menu.Menu>
        { !this.props.currentUser ?
        <Menu.Menu position='right'>
          <Menu.Item name='Sign up' as={Link} to={'/signup'}/>
          <Menu.Item name='Log In' as={Link} to={'/login'}/>
        </Menu.Menu>
          :
        <Menu.Menu position='right'>
                <Image src={`${process.env.REACT_APP_BASE_URI}${this.props.currentUser.avatar}`} as={Link} to={`/currentUser/${this.props.currentUser.id}`} style={{'fontSize':42}} avatar/>
          <Menu.Item name='Log out' as={Link} to={'/logout'}/>
        </Menu.Menu>
        }
        </Menu.Item>
      </Menu>
        </>
    );
  };
};

export default withRouter(Navigation);
