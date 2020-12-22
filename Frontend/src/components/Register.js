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
import SpinnerLarge from "../layout/SpinnerLarge";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    role: "",
    first_name: "",
    last_name: "",
    formSubmitted: false,
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
    this.setState({ formSubmitted: true });

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
    } else if (this.props.isLoading && this.state.formSubmitted) {
      return <SpinnerLarge />;
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
            <InputLabel htmlFor="first_name">
              {this.props.isKiswahili ? "Jina la kwanza" : "First name"}
            </InputLabel>
            <Input
              id="first_name"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
          </FormControl>
          {/*                <----- *** ----->           */}

          <FormControl size="medium" className={this.props.classes.formControl}>
            <InputLabel htmlFor="last_name">
              {" "}
              {this.props.isKiswahili ? "Jina la mwisho" : "Last name"}
            </InputLabel>
            <Input
              id="last_name"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
          </FormControl>
          {/*                <----- *** ----->           */}

          <FormControl size="medium" className={this.props.classes.formControl}>
            <InputLabel htmlFor="username">
              {this.props.isKiswahili ? "Jina la mtumiaji" : "Username"}
            </InputLabel>
            <Input
              id="username"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
            <FormHelperText id="my-helper-text">
              {this.props.isKiswahili
                ? "Jina la mtumiaji"
                : "You're unique username"}
            </FormHelperText>
          </FormControl>
          {/*                <----- *** ----->           */}

          <FormControl size="medium" className={this.props.classes.formControl}>
            <InputLabel htmlFor="email">
              {this.props.isKiswahili ? "Barua pepe" : "Email"}
            </InputLabel>
            <Input
              id="email"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
              type={"email"}
            />
            <FormHelperText id="my-helper-text">
              {this.props.isKiswahili
                ? "Barua pepe ya kazini"
                : "Your official email"}
            </FormHelperText>
          </FormControl>
          {/*                <----- *** ----->           */}

          <FormControl size="medium" className={this.props.classes.formControl}>
            <InputLabel htmlFor="password">
              {this.props.isKiswahili ? "Nywila" : "Password"}
            </InputLabel>
            <Input
              id="password"
              type="password"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
            <FormHelperText id="my-helper-text">
              {this.props.isKiswahili ? "Nywila ya nguvu" : "Strong password"}
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
                {this.props.isKiswahili ? "Kazi" : "Select Role"}
              </MenuItem>
              <MenuItem value={"Lecturer"}>
                {this.props.isKiswahili ? "Mhadhiri" : "Lecturer"}
              </MenuItem>
              <MenuItem value={"Student"}>
                {this.props.isKiswahili ? "Mwanafunzi" : "Student"}
              </MenuItem>
            </Select>
          </FormControl>
          {/*                <----- *** ----->           */}

          <FormControl size="medium" className={this.props.classes.formControl}>
            <FormHelperText>
              {this.props.isKiswahili ? "Uko na akaunti?" : "Have an account?"}
            </FormHelperText>
            <Link to={`/login`}>
              <p className={this.props.classes.formControl}>
                {this.props.isKiswahili ? "Ingia Hapa" : "Login Here"}
              </p>
            </Link>
          </FormControl>

          <Button type="submit" color="primary" variant="contained">
            <FormHelperText>
              {this.props.isKiswahili ? "Jisajili" : "Register"}
            </FormHelperText>
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
    minWidth: 300,
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
