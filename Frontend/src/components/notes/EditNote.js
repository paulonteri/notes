import React, { Fragment, useEffect, Component, useState } from "react";
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
  Input,
  InputLabel,
  Button,
  TextField,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

class EditNoteForm extends Component {
  state = {
    title: this.props.noteDetail.title,
    noteText: this.props.noteDetail.text,
  };

  formRef = React.createRef();

  myChangeHandler = (e) => this.setState({ [e.target.id]: e.target.value }); // grab the name and set thet to the value

  handleSubmit = (e) => {
    const { title, noteText } = this.state; // get them from the state

    console.log({
      title: title,
      text: noteText,
    });

    this.props.patchNote(this.props.noteId, {
      title: title,
      text: noteText,
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
            <FormControl size="medium" style={{ width: "270px" }}>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                id="title"
                aria-describedby="my-helper-text"
                onChange={this.myChangeHandler}
                value={this.state.title}
                required
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
                variant="outlined"
                id="noteText"
                onChange={this.myChangeHandler}
                value={this.state.noteText}
                required
                // disabled={true}
              />
            </FormControl>
            <Button type="submit" color="primary" variant="contained">
              Save Note
            </Button>
          </Fragment>
        </form>
      </div>
    );
  }
}

const EditNote = (props) => {
  const [redirect, setredirect] = useState(false);
  const [isSubmited, setisSubmited] = useState(false);

  //
  useEffect(() => {
    props.getNoteDetail(props.noteId);
    // eslint-disable-next-line
  }, [props.noteId]);

  useEffect(() => {
    if (isSubmited && !props.patchNoteFailed) {
      setredirect(true);
    }
    // eslint-disable-next-line
  }, [props.patchNoteLoading]);

  if (props.getNoteDetailLoading || props.patchNoteLoading) {
    // spinner while loading
    return <SpinnerLarge />;
    //
  } else if (redirect) {
    return <Redirect to="/notes" />;
  } else {
    return (
      <>
        <EditNoteForm
          patchNote={props.patchNote}
          noteId={props.noteId}
          getNoteDetailLoading={props.getNoteDetailLoading}
          noteDetail={props.noteDetail}
          setisSubmited={setisSubmited}
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
  };
};

export default connect(mapStateToProps, { getNoteDetail, addNote, patchNote })(
  EditNote
);
