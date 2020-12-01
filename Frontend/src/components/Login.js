import React from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";

class Login extends React.Component {
  state = { email: "", password: "" };

  myChangeHandler = (e) => this.setState({ [e.target.id]: e.target.value }); // grab the name and set thet to the value

  onChange = (e) => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  handleCheck = (event) => {
    this.setState({ [event.target.name]: event.target.checked }); // handle checkboxes
  };

  formRef = React.createRef();

  handleSubmit = (e) => {
    const { email, password } = this.state; // get them from the state

    // formData from above to the formData const
    const formData = {
      email,
      password,
    };

    // pass the formData const to the action
    // this.props.addformData(formData);
    console.log(formData);

    // clear fields
    this.formRef.current.resetFields();

    e.preventDefault();
  };

  render() {
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
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
            />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl size="medium" style={{ width: "270px" }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
            />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;
