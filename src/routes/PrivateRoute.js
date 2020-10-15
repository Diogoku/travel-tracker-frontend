import React from "react";

// REACT-REDUX
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

// REACT-ROUTER-DOM
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default PrivateRoute;
