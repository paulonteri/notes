import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../state/actions/auth/auth";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    role: "",
    first_name: "",
    last_name: "",
  };

  myChangeHandler = (e) => this.setState({ [e.target.id]: e.target.value }); // grab the name and set thet to the value

  onChange = (e) => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  handleCheck = (event) => {
    this.setState({ [event.target.name]: event.target.checked }); // handle checkboxes
  };

  handleDropdownChange = (event) => {
    this.setState({ role: event.target.value });
    // console.log({ role: event.target.value });
  };

  formRef = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      username,
      password,
      role,
      first_name,
      last_name,
      email,
    } = this.state; // get them from the state

    // clear fields
    // this.formRef.current.resetFields();

    this.props.register({
      username: username,
      email: email,
      password: password,
      role: role,
      first_name: first_name,
      last_name: last_name,
    });
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
          <FormControl size="medium" className={this.props.classes.formControl}>
            <InputLabel htmlFor="first_name">First name</InputLabel>
            <Input
              id="first_name"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
          </FormControl>
          {/*                <----- *** ----->           */}

          <FormControl size="medium" className={this.props.classes.formControl}>
            <InputLabel htmlFor="last_name">Last name</InputLabel>
            <Input
              id="last_name"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
          </FormControl>
          {/*                <----- *** ----->           */}

          <FormControl size="medium" className={this.props.classes.formControl}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
            <FormHelperText id="my-helper-text">
              A unique username
            </FormHelperText>
          </FormControl>
          {/*                <----- *** ----->           */}

          <FormControl size="medium" className={this.props.classes.formControl}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
              type={"email"}
            />
            <FormHelperText id="my-helper-text">
              Your official email
            </FormHelperText>
          </FormControl>
          {/*                <----- *** ----->           */}

          <FormControl size="medium" className={this.props.classes.formControl}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
            <FormHelperText id="my-helper-text">
              A strong password
            </FormHelperText>
          </FormControl>
          {/*                <----- *** ----->           */}

          <FormControl className={this.props.classes.formControlSmall}>
            <Select
              value={this.state.role}
              onChange={this.handleDropdownChange}
              displayEmpty
              className={this.props.classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
              required
            >
              <MenuItem value="" disabled>
                Select Role
              </MenuItem>
              <MenuItem value={"Lecturer"}>Lecturer</MenuItem>
              <MenuItem value={"Student"}>Student</MenuItem>
            </Select>
          </FormControl>
          {/*                <----- *** ----->           */}

          <FormControl size="medium" className={this.props.classes.formControl}>
            <FormHelperText>Have an account?</FormHelperText>
            <Link to={`/login`}>
              <p className={this.props.classes.formControl}>Login Here</p>
            </Link>
          </FormControl>

          <Button type="submit" color="primary" variant="contained">
            Register
          </Button>
        </form>
      </div>
    );
  }
}

const styles = {
  formControlSmall: {
    marginBottom: 20,
    width: "300px",
  },
  selectEmpty: {
    marginTop: 10,
  },
  formControl: {
    margin: 5,
    minWidth: 400,
    maxWidth: 700,
    padding: 5,
  },
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps, { register })(
  withStyles(styles)(Register)
);
