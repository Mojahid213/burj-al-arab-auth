import React from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { userContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
    const[logedInuser, setlogedInuser] = useContext(userContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
      logedInuser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
