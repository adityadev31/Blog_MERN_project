import React, { useEffect } from 'react';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useSelector, useDispatch } from 'react-redux';
import { LoginSuccess } from './redux/actions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const loginState = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  let { user } = loginState;

  useEffect(() => {
    try {
      if(user == null) {
        const userData = JSON.parse(localStorage.getItem("user")).user;
        dispatch(LoginSuccess({payload: userData}));
      }
    } catch (err) {
      localStorage.setItem("user", null);
    }
  }, 
  // eslint-disable-next-line
  []);

  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/register" component={ user ? Home : Register } />
        <Route exact path="/login" component={ user ? Home : Login } />
        <Route exact path="/write" component={ user ? Write : Login } />
        <Route exact path="/settings" component={ user ? Settings : Login } />
        <Route exact path="/post/:postId" component={ Single } />
      </Switch>
    </Router>
  )
}

export default App
