import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SpinnerLarge from "../layout/SpinnerLarge";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  isLoading,
  isKiswahili,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          isAuthenticated ||
          !process.env.NODE_ENV ||
          process.env.NODE_ENV === "development"
        ) {
          return <Component {...props} isKiswahili={isKiswahili} />;
        } else if (isAuthenticated === false) {
          return <Redirect to="/login" />;
        } else if (isLoading) {
          return <SpinnerLarge info="Authenticating..." />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps)(PrivateRoute);
