import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { URLS } from '../enums'
import Dashboard from './dashboard';
import Login from './login';
import { TOKEN_NAME } from '../constants';

class SessionManager extends Component {
  render() {
    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      return (
        <Redirect exact to={URLS.LOGIN_URL} />
      );
    }
    return (
      <div>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path={URLS.DASHBOARD_URL} component={Dashboard} />
          </Switch>
      </div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <CssBaseline>
        <BrowserRouter>
          <div>
            <Route path='/' component={SessionManager} />
            <Route exact path={URLS.LOGIN_URL} component={Login} />
          </div>
        </BrowserRouter>
      </CssBaseline>
    );
  }
}

export default App;
