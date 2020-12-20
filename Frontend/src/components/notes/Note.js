import React, { Component } from "react";
import { FormHelperText, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const styles = {
  formControl: {
    margin: 5,
    minWidth: 200,
    maxWidth: 450,
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

const names = [
  {
    id: 6,
    title: "owner title 2 5",
    text: "owner owner owner bro",
    owner: 1,
  },
  {
    id: 10,
    title: "One sdsds",
    text: "1",
    owner: 1,
  },
  {
    id: 1,
    title: "Note Title",
    text: "Note Text",
    owner: 1,
  },
  {
    id: 2,
    title: "Note 2",
    text: "Note 2",
    owner: 1,
  },
  {
    id: 9,
    title: "Math",
    text: "Math",
    owner: 1,
  },
  {
    id: 4,
    title: "Four",
    text: "4",
    owner: 1,
  },
  {
    id: 3,
    title: "30",
    text: "dfdsfsdf",
    owner: 1,
  },
];

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

class Note extends Component {
  state = {
    title: "",
    noteText: "",
    personName: [],
  };
  classes = this.props.classes;
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
              required
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
              required
              onChange={this.myChangeHandler}
            />
            <FormHelperText id="my-helper-text">
              Write down your notes
            </FormHelperText>
          </FormControl>
          <FormControl className={this.classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">
              Share note with
            </InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={this.state.personName}
              onChange={(e) => {
                this.setState({ personName: e.target.value });
              }}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selectedIds) => {
                var selectedItems = names.filter((item) =>
                  selectedIds.includes(item.id)
                );

                return (
                  <div className={this.classes.chips}>
                    {selectedItems.map((selectedVal) => (
                      <Chip
                        key={selectedVal.id}
                        label={selectedVal.title}
                        className={this.classes.chip}
                      />
                    ))}
                  </div>
                );
              }}
              MenuProps={MenuProps}
            >
              {names.map((user) => (
                <MenuItem
                  key={user.id}
                  value={user.id}
                  // style={theme.typography.fontWeightMedium}
                >
                  {user.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" color="primary" variant="contained">
            Save Note
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Note);
