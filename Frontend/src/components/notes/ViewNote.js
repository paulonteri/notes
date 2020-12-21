import React, { Fragment, useEffect, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SpinnerLarge from "../../layout/SpinnerLarge";
import {
  getNoteDetail,
  addNote,
  patchNote,
} from "../../state/actions/notes/notes";
import {
  FormControl,
  Button,
  TextField,
  Input,
  InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getUsers } from "../../state/actions/users/users";
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

class ViewNoteForm extends Component {
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

  render() {
    return (
      <div style={{ paddingTop: 30 }}>
        <form
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
            <Link to={`/note/${this.props.noteId}/edit`}>
              <Button color="primary" variant="contained">
                Modify Note
              </Button>
            </Link>
            <FormControl
              size="medium"
              className={this.props.classes.formControlLarge}
            >
              <TextField
                id="title"
                label="Title"
                aria-describedby="my-helper-text"
                value={this.state.title}
                readOnly
                variant="filled"
                // disabled={true}
              />
            </FormControl>
            <FormControl
              size="medium"
              className={this.props.classes.formControlLarge}
            >
              <TextField
                label="Note"
                multiline
                rows={6}
                variant="filled"
                id="noteText"
                value={this.state.noteText}
                readOnly
                // disabled={true}
              />
            </FormControl>
            {this.props.noteDetail && this.props.noteDetail.shared_to ? (
              <FormControl className={this.props.classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">
                  Shared with
                </InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  readOnly
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

const NoteForm = withStyles(styles)(ViewNoteForm);

const ViewNote = (props) => {
  useEffect(() => {
    props.getUsers();
    props.getNoteDetail(props.noteId);
    // eslint-disable-next-line
  }, [props.noteId]);

  if (props.getNoteDetailLoading || props.getUsersLoading) {
    // spinner while loading
    return <SpinnerLarge />;
    //
  } else {
    return (
      <>
        <NoteForm
          patchNote={props.patchNote}
          noteId={props.noteId}
          getNoteDetailLoading={props.getNoteDetailLoading}
          noteDetail={props.noteDetail}
          users={props.users}
        />
      </>
    );
  }
};

ViewNote.propTypes = {
  getNoteDetailLoading: PropTypes.bool.isRequired,
  getNoteDetailFailed: PropTypes.bool.isRequired,
  getNoteDetailSuccess: PropTypes.bool.isRequired,
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
})(ViewNote);
