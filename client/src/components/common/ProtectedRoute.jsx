import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("user");

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <>
            {/* Only show header when logged in */}
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
