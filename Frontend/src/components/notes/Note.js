import React from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
  TextField,
} from "@material-ui/core";

class Login extends React.Component {
  state = { title: "", noteText: "" };
  formRef = React.createRef();

  myChangeHandler = (e) => this.setState({ [e.target.id]: e.target.value }); // grab the name and set thet to the value

  onChange = (e) => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  handleCheck = (event) => {
    this.setState({ [event.target.name]: event.target.checked }); // handle checkboxes
  };

  handleDate = (dateString, id) => {
    this.setState({ [id]: dateString }); // handle date-picker
  };

  handleSubmit = (e) => {
    const { title, noteText } = this.state; // get them from the state

    // formData from above to the formData const
    const formData = {
      title,
      noteText,
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
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
            />
            <FormHelperText id="my-helper-text">
              Give your notes a title
            </FormHelperText>
          </FormControl>
          <FormControl
            size="medium"
            style={{
              width: "80%",
              padding: "10px 5px",
            }}
          >
            <TextField
              label="Note"
              multiline
              rows={4}
              variant="outlined"
              id="noteText"
              onChange={this.myChangeHandler}
            />
            <FormHelperText id="my-helper-text">
              Write down your notes
            </FormHelperText>
          </FormControl>
          <Button type="submit" color="primary" variant="contained">
            Save Note
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;
