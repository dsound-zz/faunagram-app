

import React, { Component } from 'react';
import { Switch, Route, withRouter } from  'react-router-dom';
import { Grid} from 'semantic-ui-react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import HeaderContainer from './containers/HeaderContainer';
import UserProfile from './containers/UserProfile';
import SightingsContainer from './containers/SightingsContainer';
import AnimalsContainer from './containers/AnimalsContainer';
import PostSightingModal from './components/PostSightingModal';
import UsersContainer from './containers/UsersContainer';
import './App.css';




class App extends Component {
    _isMounted = false;

  state = {
    openModal: false,
    currentUser: null,
    likes: 0,
    sightings: [],
    animals: [],
    users: []
  };
    // SET UP MODAL 

  handleOpenModal = () => this.setState({  openModal: true, })

  handleCloseModal = () => {
    this.setState({ openModal: false })
    this.props.history.push('/home')
  };

    // FETCH SIGHTINGS, ANIMALS, USERS AND CURRENT USER

  componentDidMount() {
    this._isMounted = true;
    let token = localStorage.getItem('token')
      if (token) {
        fetch(`${process.env.REACT_APP_API_URI}/current_user`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
      .then(res => res.json())
      .then(response => {
        if (response.errors) {
          this.props.history.push('/login')
        } else {
          this.setState({ currentUser: response })
        }
      })
      .then(
        fetch(`${process.env.REACT_APP_API_URI}/users`)
        .then(r => r.json())
        .then(fetchedUsers => {
          if (fetchedUsers.errors) {
            this.props.history.push('/signup')
          } else {
            this.setState({ users: fetchedUsers })
          }
        })
      )
      .then(
        fetch(`${process.env.REACT_APP_API_URI}/animals`)
        .then(r => r.json())
        .then(fetchedAnimals => {
          if (fetchedAnimals.errors) {
          } else {
            this.setState({ animals: fetchedAnimals })
          }
        })
      )
      .then(
        fetch(`${process.env.REACT_APP_API_URI}/sightings`)
        .then(r => r.json())
        .then(fetchedSightings => {
          if (this._isMounted) {
          if (fetchedSightings.errors) {
          } else {
          this.setState({ sightings:  fetchedSightings, ...this.state.sightings  })
          }
        }
        })
      )
    } else {
        this.props.history.push('/home')
    }
  };
  

  // LOGOUT 

  logout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('token')
    this.props.history.push('/login')
  };

  //  SIGNUP
  
  signup = (name, username, password, passwordConfirmation) => {
    if (password === passwordConfirmation) {
      fetch(`${process.env.REACT_APP_API_URI}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          username: username,
          password: password
        })
      })
      .then(res => res.json())
      .then((response) => {
        if (response.errors) {
          alert(response.errors)
        } else {
          localStorage.setItem('token', response.token)
          this.setState({
            currentUser: response.user
          })
          this.setState({ users: [...this.state.users, response.user] })
          alert(`Welcome, ${response.user.name}!`)
          this.props.history.push(`/home`)
        }
      })
    } else {
        alert('Passwords do not match!!')
    }
  };
 
//     LOGIN

  login = (username, password) => {
    fetch(`${process.env.REACT_APP_API_URI}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      } else {
        localStorage.setItem('token', response.token)
        this.setState({
          currentUser: response.user
        })
        this.props.history.push(`/home`)
      }
    })
  };


  updateProfile = (event, password, passwordConfirmation) => {
    if (password === passwordConfirmation) {
      const formData = new FormData(event.target)
      fetch(`${process.env.REACT_APP_API_URI}/users/${this.state.currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors)
        } else {
          this.setState({
            currentUser: response
          })
          this.props.history.push(`/users/${response.id}`)
        }
      })
    } else {
      alert('Passwords do not match!!')
    };
  };


  deleteProfile = (userId) => {
    fetch(`${process.env.REACT_APP_API_URI}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    const usersCopy = this.state.users.slice()
    const foundOldSighting = usersCopy.findIndex(user => user.id === userId);
    usersCopy.splice(foundOldSighting, 1)
    this.setState({ users: usersCopy  })
    this.logout()
  };



  postSighting = (event, userId, animalId) => {
    const formData = new FormData(event.target);
    formData.append("user_id", userId)
    formData.append("animal_id", animalId)
    debugger
    fetch(`${process.env.REACT_APP_API_URI}/sightings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
      })
      .then(r => r.json())
      .then(newSighting => {
        this.setState({ sightings: [newSighting, ...this.state.sightings]})
        this.props.history.push('/home')
    })
  };


  editSighting = (event, userId, animalId, sightingId) => {
    const formData = new FormData(event.target);
    formData.append("user_id", userId)
    formData.append("animal_id", animalId)
    formData.append("id", sightingId)
    debugger
    fetch(`${process.env.REACT_APP_API_URI}/sightings/${sightingId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
      })
    .then(r => r.json())
    .then(updatedSighting => {
      const sightingsCopy = this.state.sightings.slice()
      const foundOldSighting = sightingsCopy.findIndex(sighting => sighting.id === sightingId);
      sightingsCopy.splice(foundOldSighting, 1, updatedSighting)
      this.setState({ sightings: sightingsCopy  })
    });
  };


  deleteSighting = (sightingId) => {
    fetch(`${process.env.REACT_APP_API_URI}/sightings/${sightingId}`, {
      method: 'DELETE',
      headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     }
    })
     const sightingsCopy = this.state.sightings.slice()
     const foundOldSighting = sightingsCopy.findIndex(sighting => sighting.id === sightingId);
     sightingsCopy.splice(foundOldSighting, 1)
     this.setState({ sightings: sightingsCopy  })
   };


  likeSighting = (like, sightingId) => {
    fetch(`${process.env.REACT_APP_API_URI}/sightings/${sightingId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        likes: like + 1
      })
    })
    .then(r => r.json())
    .then(likedSighting => {
      const sightingsCopy = this.state.sightings.slice()
      const foundOldSighting = sightingsCopy.findIndex(sighting => sighting.id === sightingId);
      sightingsCopy.splice(foundOldSighting, 1, likedSighting)
      this.setState({ sightings: sightingsCopy  })
    });
  };

  componentWillUnmount() {
  this._isMounted = false;
}


  render() {
    
    return (
       
      // SETUP COLUMNS FOR SCREEN LAYOUT 
     
     <Grid>
        <Grid.Column width={3} >
          </Grid.Column>
            <Grid.Column width={10}>
              <HeaderContainer currentUser={this.state.currentUser} animals={this.state.animals} handleOpenModal={this.handleOpenModal}  />
               
             

                <Switch>

                  <Route path='/users' render={(routerProps) => <UsersContainer users={this.state.users} {...routerProps}/>}/>
                  <Route path='/currentUser/:id' render={(routerProps) => <UserProfile currentUser={this.state.currentUser} updateProfile={this.updateProfile}
                        deleteProfile={this.deleteProfile} {...routerProps}/>}/>
                  <Route path='/login' render={(routerProps) => <LoginForm login={this.login} {...routerProps}/>}/>
                  <Route path='/logout' render={this.logout}/>
                  <Route path='/signup' render={(routerProps) => <SignupForm signup={this.signup} avatars={this.state.avatars} {...routerProps}/>}/>
                  <Route path='/animals' render={(routerProps) => <AnimalsContainer animals={this.state.animals} {...routerProps}/>}/>
                  <Route path='/home'  render={(routerProps) => <SightingsContainer currentUser={this.state.currentUser} sightings={this.state.sightings} handleOpenModal={this.handleOpenModal} editSighting={this.editSighting}
                     likeSighting={this.likeSighting}  users={this.state.users} animals={this.state.animals} deleteSighting={this.deleteSighting}
                      addComment={this.addComment}  {...routerProps} />}/>
                  <Route path='/postSighting' render={(routerProps) => <PostSightingModal currentUser={this.state.currentUser} animals={this.state.animals} postSighting={this.postSighting}
                   editSighting={this.editSighting} openModal={this.state.openModal} closeModal={this.handleCloseModal} {...routerProps}/>}/>
                </Switch>

              </Grid.Column>
            <Grid.Column width={3}>
          </Grid.Column>
        </Grid>




        );
      };
};
export default withRouter(App); 
