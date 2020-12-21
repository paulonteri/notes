import React, { Component } from "react";
import { FormHelperText, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { getUsers } from "../../state/actions/users/users";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SpinnerLarge from "../../layout/SpinnerLarge";
import { addNote } from "../../state/actions/notes/notes";
import { Redirect } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class NewNote extends Component {
  state = {
    title: "",
    noteText: "",
    sharedTo: [],
    formSubmitted: false,
  };
  formRef = React.createRef();

  componentDidMount() {
    this.props.getUsers();
  }

  myChangeHandler = (e) => this.setState({ [e.target.id]: e.target.value }); // grab the name and set thet to the value

  onChange = (e) => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  handleCheck = (event) => {
    this.setState({ [event.target.name]: event.target.checked }); // handle checkboxes
  };

  handleDate = (dateString, id) => {
    this.setState({ [id]: dateString }); // handle date-picker
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, noteText, sharedTo } = this.state; // get them from the state

    // formData from above to the formData const
    const formData = {
      title,
      text: noteText,
      shared_to: sharedTo,
    };

    // pass the formData const to the action
    // this.props.addformData(formData);
    console.log(formData);

    this.props.addNote(formData);

    this.setState({ formSubmitted: true });

    // clear fields
    // this.formRef.current.resetFields();
  };

  render() {
    if (this.props.getUsersLoading) {
      return <SpinnerLarge />;
    } else if (
      this.state.formSubmitted &&
      !this.props.addNoteLoading &&
      !this.props.addNoteFailed
    ) {
      return <Redirect to="/notes" />;
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
          <FormControl
            size="medium"
            className={this.props.classes.formControlLarge}
          >
            <InputLabel htmlFor="title">
              {" "}
              {this.props.isKiswahili ? "Kichwa*" : "Title*"}
            </InputLabel>
            <Input
              id="title"
              aria-describedby="my-helper-text"
              onChange={this.myChangeHandler}
              required
            />
            <FormHelperText id="my-helper-text">
              {this.props.isKiswahili
                ? "Kichwa ya maadishi"
                : " Give your notes a title"}
            </FormHelperText>
          </FormControl>
          <FormControl
            size="medium"
            className={this.props.classes.formControlLarge}
          >
            <TextField
              label={this.props.isKiswahili ? "Maandishi" : "Note"}
              multiline
              rows={4}
              variant="outlined"
              id="noteText"
              required
              onChange={this.myChangeHandler}
            />
            <FormHelperText id="my-helper-text">
              {this.props.isKiswahili
                ? "Andika Maandishi"
                : "Write down your notes"}
            </FormHelperText>
          </FormControl>
          <FormControl className={this.props.classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">
              {this.props.isKiswahili
                ? "Shiriki maandishi na... "
                : "Share note with..."}
            </InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={this.state.sharedTo}
              onChange={(e) => {
                // console.log(e.target.value);
                this.setState({ sharedTo: e.target.value });
              }}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selectedIds) => {
                var selectedItems = this.props.users.filter((item) =>
                  selectedIds.includes(item.id)
                );
                // console.log(selectedItems);

                return (
                  <div className={this.props.classes.chips}>
                    {selectedItems.map((selectedVal) => (
                      <Chip
                        key={selectedVal.id}
                        label={selectedVal.username}
                        className={this.props.classes.chip}
                      />
                    ))}
                  </div>
                );
              }}
              MenuProps={MenuProps}
            >
              {this.props.users.map((user) => (
                <MenuItem
                  key={user.id}
                  value={user.id}
                  // style={theme.typography.fontWeightMedium}
                >
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" color="primary" variant="contained">
            {this.props.isKiswahili ? "Wasislisha Maandishi" : "Save Note"}
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
    maxWidth: 500,
    padding: 5,
  },

  formControlLarge: {
    margin: 5,
    width: "80%",
    minWidth: 400,
    maxWidth: 1000,
    padding: 5,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: 5,
  },
};

NewNote.propTypes = {
  getUsersLoading: PropTypes.bool.isRequired,
  getUsersFailed: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  addNoteLoading: PropTypes.bool.isRequired,
  addNoteFailed: PropTypes.bool.isRequired,
  addNoteSuccess: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  getUsersLoading: state.usersReducer.getUsersLoading,
  getUsersFailed: state.usersReducer.getUsersFailed,
  users: state.usersReducer.users,
  addNoteLoading: state.notesReducer.addNoteLoading,
  addNoteFailed: state.notesReducer.addNoteFailed,
  addNoteSuccess: state.notesReducer.addNoteSuccess,
});

export default connect(mapStateToProps, { getUsers, addNote })(
  withStyles(styles)(NewNote)
);
