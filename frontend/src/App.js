import React, { Component } from 'react';
import UserOverviewPage from "./Pages/UserOverviewPage";
import LoginPage from "./Pages/LoginPage";
import JoinPage from "./Pages/JoinPage";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
          	 <Route path="/join" component={JoinPage} />
             <Route path="/login" component={LoginPage} />
             <PrivateRoute path="/" >
                <UserOverviewPage/>
              </PrivateRoute>
          </Switch>
        </Router>
    );
  }
}

export default App;