import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '../service/authentication.service';

const PrivateRoute = ({allowedToSeePage, children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => {
        if (!authenticationService.isAuthenticated()) {
          return <Redirect to={{ pathname: "/login", state: { from: location }}} />
        } else {

          return <div>
              {children}
            </div>
        }
      }
    }
  />
)

export default PrivateRoute;
