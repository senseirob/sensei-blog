import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PostCreate from './components/posts/PostCreate';
import PostEdit from './components/posts/PostEdit';

// Authentication and Private Routing
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Redux things
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/posts/:id' component={Post} />
          <Switch>
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/create-post' component={PostCreate} />
            <PrivateRoute exact path='/edit-post/:id' component={PostEdit} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
