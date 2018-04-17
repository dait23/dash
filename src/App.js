import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import Spinner from 'react-spinkit';

import Loadable from 'react-loadable'
import Loading from './Loading'
import fakeDelay from './fakeDelay'


// import Full from './containers/Full/'
// import FullMdm from './containers/Mdm/'
// import FullBde from './containers/Bde/'
// import FullMerchant from './containers/Merchant/'
// import FullMember from './containers/Member/'
// import Login from './views/Pages/Login/'


const Full = Loadable({
 loader: () => fakeDelay(500).then(() => import('./containers/Full/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const FullMdm = Loadable({
 loader: () => fakeDelay(500).then(() => import('./containers/Mdm/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const FullBde = Loadable({
 loader: () => fakeDelay(500).then(() => import('./containers/Bde/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const FullMerchant = Loadable({
 loader: () => fakeDelay(500).then(() => import('./containers/Merchant/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const FullMember = Loadable({
 loader: () => fakeDelay(500).then(() => import('./containers/Member/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const Login = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Pages/Login/')),
   loading: Loading,
  timeout: 10000, // 10 second
});



class App extends React.Component {
 

  // constructor(props) {
  //   super(props);
    
  // }


  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken')
    window.location.reload()
    window.location= "/";
  }

  _showLogin = () => {
    this.props.history.replace('/login')
  }

  _showSignup = () => {
    this.props.history.replace('/signup')
  }

  _isLoggedIn = () => {
     localStorage.setItem('uid', this.props.loggedInUserQuery.loggedInUser.id);
     localStorage.setItem('uname', this.props.loggedInUserQuery.loggedInUser.name);
     localStorage.setItem('urole', this.props.loggedInUserQuery.loggedInUser.jabatan);
     return this.props.loggedInUserQuery.loggedInUser && this.props.loggedInUserQuery.loggedInUser.id !== null
    //window.location= "/";
    //console.log(this.props.loggedInUserQuery.loggedInUser.jabatan);
    //

  }
  
  render () {
   //console.log(this.props.loggedInUserQuery.loggedInUser.jabatan);

    if (this.props.loggedInUserQuery.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    if (this._isLoggedIn() && window.localStorage.getItem('urole') === 'Super') {
      return this.renderLoggedIn()
    } 
    if (this._isLoggedIn() && window.localStorage.getItem('urole') === 'Mdm') {
      return this.renderLoggedInMdm()
    }
    if (this._isLoggedIn() && window.localStorage.getItem('urole') === 'Bde') {
      return this.renderLoggedInBde()
    }
    if (this._isLoggedIn() && window.localStorage.getItem('urole') === 'Merchant') {
      return this.renderLoggedInMerchant()
    } 
     if (this._isLoggedIn() && window.localStorage.getItem('urole') === 'Member') {
      return this.renderLoggedInMember()
    } 
    else {
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {

    return (
      <div>

          <Full />
      </div>
    )
  }

  renderLoggedInMdm() {

    return (
      <div>

          <FullMdm />
      </div>
    )
  }

    renderLoggedInBde() {

    return (
      <div>

          <FullBde />
      </div>
    )
  }

   renderLoggedInMerchant() {

    return (
      <div>

          <FullMerchant />
      </div>
    )
  }

  renderLoggedInMember() {

    return (
      <div>

          <FullMember />
      </div>
    )
  }

  renderLoggedOut() {
    return (
      <div>
        <Login />
      </div>
    )
  }
}

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
      name
      status
      jabatan
    }
  }
`


export default compose(
  graphql(LOGGED_IN_USER_QUERY, {
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
  // graphql(BIO_DATA, {
  //   name: 'Biodata',
  //   options: { variables: { uid: localStorage.getItem('uid'), fetchPolicy: 'network-only'  } }
  // })
)(withRouter(App))
