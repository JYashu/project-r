import React from 'react';
import { RouteProps, Route, Redirect, RouteComponentProps } from 'react-router';
import { getTokens } from '../../utils/requestTokens';

interface Props extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const PrivateRoute = ({ component, ...rest }: Props) => (
  <Route
    {...rest}
    render={(props) => {
      const { accessToken } = getTokens();
      const isAuthenticated = accessToken != null;

      const { location } = props;

      return isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            // state: { from: location },
          }}
        />
      );
    }}
  />
);

export default PrivateRoute;
