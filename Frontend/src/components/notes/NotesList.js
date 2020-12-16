import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNotes } from "../../state/actions/notes/notes";
import SpinnerLarge from "../../layout/SpinnerLarge";

export const NotesList = (props) => {
  useEffect(() => {
    props.getNotes();
    // eslint-disable-next-line
  }, []);

  if (props.getNotesLoading) {
    // spinner while loading
    return <SpinnerLarge />;
  }
  return (
    <div>
      <div>sis</div>
      {props.notes.map((note) => {
        return <div>{note.title}</div>;
      })}
    </div>
  );
};

NotesList.propTypes = {
  getNotesLoading: PropTypes.bool.isRequired,
  getNotesFailed: PropTypes.bool.isRequired,
  getNotesSucces: PropTypes.bool.isRequired,
  notes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  getNotesLoading: state.notesReducer.getNotesLoading,
  getNotesFailed: state.notesReducer.getNotesFailed,
  getNotesSucces: state.notesReducer.getNotesSucces,
  notes: state.notesReducer.notes,
});

export default connect(mapStateToProps, { getNotes })(NotesList);
