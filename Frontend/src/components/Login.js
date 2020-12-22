import React, { Component } from "react";
import { connect } from "react-redux";
import { login, loadUser } from "../state/actions/auth/auth";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import SpinnerLarge from "../layout/SpinnerLarge";

class Login extends Component {
  state = { username: "", password: "", formSubmitted: false };

  myChangeHandler = (e) => this.setState({ [e.target.id]: e.target.value }); // grab the name and set thet to the value

  onChange = (e) => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  handleCheck = (event) => {
    this.setState({ [event.target.name]: event.target.checked }); // handle checkboxes
  };

  formRef = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ formSubmitted: true });

    const { username, password } = this.state; // get them from the state

    // clear fields
    // this.formRef.current.resetFields();

    this.props.login(username, password);
  };

  componentDidMount() {
    this.props.loadUser();
  }

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
            <InputLabel htmlFor="username">
              {this.props.isKiswahili ? "Jina la mtumiaji" : "Username"}
            </InputLabel>
            <Input
              id="username"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
            <FormHelperText>
              {this.props.isKiswahili
                ? "Jina la mtumiaji"
                : "You're unique username"}
            </FormHelperText>
          </FormControl>
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
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl size="medium" className={this.props.classes.formControl}>
            <FormHelperText>
              {this.props.isKiswahili
                ? "Hauna akaunti?"
                : "Don't have an account?"}
            </FormHelperText>
            <Link to={`/register`}>
              <p className={this.props.classes.formControl}>
                {this.props.isKiswahili ? "Jisajili Hapa" : "Register Here"}
              </p>
            </Link>
          </FormControl>
          <Button type="submit" color="primary" variant="contained">
            {this.props.isKiswahili ? "Ingia" : "Login"}
          </Button>
        </form>
      </div>
    );
  }
}

const styles = {
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

export default connect(mapStateToProps, { login, loadUser })(
  withStyles(styles)(Login)
);
