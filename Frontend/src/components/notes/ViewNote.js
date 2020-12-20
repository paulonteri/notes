import React, { Fragment, useEffect, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SpinnerLarge from "../../layout/SpinnerLarge";
import {
  getNoteDetail,
  addNote,
  patchNote,
} from "../../state/actions/notes/notes";
import { FormControl, Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

class ViewNoteForm extends Component {
  state = {
    title: this.props.noteDetail.title,
    noteText: this.props.noteDetail.text,
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
              style={{
                width: "80%",
                padding: "10px 5px",
              }}
            >
              <TextField
                id="title"
                label="Title"
                aria-describedby="my-helper-text"
                value={this.state.title}
                required
                readOnly
                variant="filled"
                // disabled={true}
              />
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
                rows={6}
                variant="filled"
                id="noteText"
                value={this.state.noteText}
                required
                readOnly
                // disabled={true}
              />
            </FormControl>
          </Fragment>
        </form>
      </div>
    );
  }
}

const ViewNote = (props) => {
  useEffect(() => {
    props.getNoteDetail(props.noteId);
    // eslint-disable-next-line
  }, [props.noteId]);

  if (props.getNoteDetailLoading) {
    // spinner while loading
    return <SpinnerLarge />;
    //
  } else {
    return (
      <>
        <ViewNoteForm
          patchNote={props.patchNote}
          noteId={props.noteId}
          getNoteDetailLoading={props.getNoteDetailLoading}
          noteDetail={props.noteDetail}
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
};

const mapStateToProps = (state, ownProps) => {
  const noteId = parseInt(ownProps.match.params.noteId);
  return {
    noteId: noteId,
    getNoteDetailLoading: state.notesReducer.getNoteDetailLoading,
    getNoteDetailFailed: state.notesReducer.getNoteDetailFailed,
    getNoteDetailSuccess: state.notesReducer.getNoteDetailSuccess,
    noteDetail: state.notesReducer.noteDetail,
  };
};

export default connect(mapStateToProps, { getNoteDetail, addNote, patchNote })(
  ViewNote
);
