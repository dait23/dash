import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable'
import Loading from './Loading'
import fakeDelay from './fakeDelay'
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink} from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'tachyons'

import {MainApi} from './views/Api/';
// import App from './App'

import 'font-awesome/css/font-awesome.min.css';
  // Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

// Containers
//import Full from './containers/Full/'

// Views
// import Login from './views/Pages/Login/'
// import Page404 from './views/Pages/Page404/'
// import Page500 from './views/Pages/Page500/'


const App = Loadable({
 loader: () => fakeDelay(500).then(() => import('./App')),
   loading: Loading,
  timeout: 10000, // 10 second
});
////////////////////////////////////////////////

const Login = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Pages/Login/')),
   loading: Loading,
  timeout: 10000, // 10 second
});

const Page404 = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Pages/Page404/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const Page500 = Loadable({
 loader: () => fakeDelay(500).then(() => import('./views/Pages/Page500/')),
   loading: Loading,
  timeout: 10000, // 10 second
});


const httpLink = createHttpLink({ uri: MainApi })

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('spaceToken')
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})


//const history = createBrowserHistory();




ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route path='/' component={App} />
        <Route exact path='/login' component={Login} />
        <Route exact path="/404" name="Page 404" component={Page404}/>
        <Route exact path="/500" name="Page 500" component={Page500}/>
      </div>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
registerServiceWorker();