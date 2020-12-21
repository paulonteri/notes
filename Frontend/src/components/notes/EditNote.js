import React, { Fragment, useEffect, Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SpinnerLarge from "../../layout/SpinnerLarge";
import {
  getNoteDetail,
  addNote,
  patchNote,
} from "../../state/actions/notes/notes";
import { getUsers } from "../../state/actions/users/users";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  TextField,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

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

class EditNoteForm extends Component {
  getSharedTo(noteDetail) {
    if (noteDetail && noteDetail.shared_to) {
      return noteDetail.shared_to.map((user) => {
        return user.id;
      });
    }
    return [];
  }

  state = {
    title: this.props.noteDetail.title,
    noteText: this.props.noteDetail.text,
    sharedTo: this.getSharedTo(this.props.noteDetail),
  };

  formRef = React.createRef();

  myChangeHandler = (e) => this.setState({ [e.target.id]: e.target.value }); // grab the name and set thet to the value

  handleSubmit = (e) => {
    const { title, noteText, sharedTo } = this.state; // get them from the state

    console.log({
      title: title,
      text: noteText,
      shared_to: sharedTo,
    });

    this.props.patchNote(this.props.noteId, {
      title,
      text: noteText,
      shared_to: sharedTo,
    });

    // clear fields
    // this.formRef.current.resetFields();

    this.props.setisSubmited(true);

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
          <Fragment>
            <FormControl className={this.props.classes.formControlLarge}>
              <InputLabel htmlFor="title">
                {this.props.isKiswahili ? "Kichwa" : "Title"}
              </InputLabel>
              <Input
                id="title"
                aria-describedby="my-helper-text"
                onChange={this.myChangeHandler}
                value={this.state.title}
                required
                // disabled={true}
              />
            </FormControl>
            <FormControl className={this.props.classes.formControlLarge}>
              <TextField
                label={this.props.isKiswahili ? "Maandishi" : "Note"}
                multiline
                rows={6}
                variant="outlined"
                id="noteText"
                onChange={this.myChangeHandler}
                value={this.state.noteText}
                required
                // disabled={true}
              />
            </FormControl>

            {this.props.noteDetail && this.props.noteDetail.shared_to ? (
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
            ) : (
              <></>
            )}
            <Button type="submit" color="primary" variant="contained">
              {this.props.isKiswahili ? "Wasislisha Maandishi" : "Save Note"}
            </Button>
          </Fragment>
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
    minWidth: 300,
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

const NoteForm = withStyles(styles)(EditNoteForm);

const EditNote = (props) => {
  const [redirect, setredirect] = useState(false);
  const [isSubmited, setisSubmited] = useState(false);

  //
  useEffect(() => {
    props.getUsers();
    props.getNoteDetail(props.noteId);
    // eslint-disable-next-line
  }, [props.noteId]);

  useEffect(() => {
    if (isSubmited && !props.patchNoteFailed) {
      setredirect(true);
    }
    // eslint-disable-next-line
  }, [props.patchNoteLoading]);

  useEffect(() => {
    props.applyChanges();
  });

  if (
    props.getNoteDetailLoading ||
    props.patchNoteLoading ||
    props.getUsersLoading
  ) {
    // spinner while loading
    return <SpinnerLarge />;
    //
  } else if (redirect) {
    return <Redirect to="/notes" />;
  } else {
    return (
      <>
        <NoteForm
          patchNote={props.patchNote}
          noteId={props.noteId}
          getNoteDetailLoading={props.getNoteDetailLoading}
          noteDetail={props.noteDetail}
          setisSubmited={setisSubmited}
          users={props.users}
          isKiswahili={props.isKiswahili}
        />
      </>
    );
  }
};

EditNote.propTypes = {
  getNoteDetailLoading: PropTypes.bool.isRequired,
  getNoteDetailFailed: PropTypes.bool.isRequired,
  getNoteDetailSuccess: PropTypes.bool.isRequired,
  patchNoteLoading: PropTypes.bool.isRequired,
  patchNoteFailed: PropTypes.bool.isRequired,
  patchNoteSuccess: PropTypes.bool.isRequired,
  noteDetail: PropTypes.object.isRequired,
  noteId: PropTypes.number.isRequired,
  getUsersLoading: PropTypes.bool.isRequired,
  getUsersFailed: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const noteId = parseInt(ownProps.match.params.noteId);
  return {
    noteId: noteId,
    patchNoteLoading: state.notesReducer.patchNoteLoading,
    patchNoteFailed: state.notesReducer.patchNoteFailed,
    patchNoteSuccess: state.notesReducer.patchNoteSuccess,
    getNoteDetailLoading: state.notesReducer.getNoteDetailLoading,
    getNoteDetailFailed: state.notesReducer.getNoteDetailFailed,
    getNoteDetailSuccess: state.notesReducer.getNoteDetailSuccess,
    noteDetail: state.notesReducer.noteDetail,
    getUsersLoading: state.usersReducer.getUsersLoading,
    getUsersFailed: state.usersReducer.getUsersFailed,
    users: state.usersReducer.users,
  };
};

export default connect(mapStateToProps, {
  getNoteDetail,
  addNote,
  patchNote,
  getUsers,
})(EditNote);
