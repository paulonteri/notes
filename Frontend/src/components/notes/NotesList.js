import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNotes } from "../../state/actions/notes/notes";
import SpinnerLarge from "../../layout/SpinnerLarge";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 5,
    marginBottom: 10,
    backgroundColor: "#f7f7f7",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const NotesList = (props) => {
  const classes = useStyles();

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
      <div>Notes</div>
      {props.notes.map((note) => {
        return (
          <Card className={classes.root} key={note.id} variant="outlined">
            <CardContent className={classes.cardContent}>
              <div>
                <Typography variant="h5" component="h2">
                  {note.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {note.text.substring(0, 20)}...
                </Typography>
              </div>
              <div>
                <Link to={`/note/${note.id}`}>
                  <Button variant="contained" color="primary">
                    View Note
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

NotesList.propTypes = {
  getNotesLoading: PropTypes.bool.isRequired,
  getNotesFailed: PropTypes.bool.isRequired,
  getNotesSuccess: PropTypes.bool.isRequired,
  notes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  getNotesLoading: state.notesReducer.getNotesLoading,
  getNotesFailed: state.notesReducer.getNotesFailed,
  getNotesSuccess: state.notesReducer.getNotesSuccess,
  notes: state.notesReducer.notes,
});

export default connect(mapStateToProps, { getNotes })(NotesList);
