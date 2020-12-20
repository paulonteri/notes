import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../state/actions/auth/auth";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  myChangeHandler = (e) => this.setState({ [e.target.id]: e.target.value }); // grab the name and set thet to the value

  onChange = (e) => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  handleCheck = (event) => {
    this.setState({ [event.target.name]: event.target.checked }); // handle checkboxes
  };

  formRef = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state; // get them from the state

    // clear fields
    // this.formRef.current.resetFields();

    this.props.login(username, password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form
          ref={this.formRef}
          onSubmit={this.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "180px",
            // width: "300px",
            justifyContent: "space-between",
            alignItems: "center",
            // backgroundColor: "red",
          }}
        >
          <FormControl size="medium" style={{ width: "270px" }}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
            <FormHelperText id="my-helper-text">
              You're unique username
            </FormHelperText>
          </FormControl>
          <FormControl size="medium" style={{ width: "270px" }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
          <Button type="submit" color="primary" variant="contained">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps, { login })(Login);
