import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNotes } from "../../state/actions/sharedNotes/notes";
import SpinnerLarge from "../../layout/SpinnerLarge";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 20,
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
    marginBottom: 20,
  },
  header: {
    marginLeft: 10,
  },
});

export const NotesSharedList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getNotes();
    console.log(props);
    console.log(props.getNotes());

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    props.applyChanges();
  });

  if (props.getNotesLoading) {
    // spinner while loading
    return <SpinnerLarge />;
  }

  return (
    <div>
      <Typography className={classes.header} color="textSecondary">
        {props.isKiswahili
          ? "    Maandishi uliyoonyeshwa na marafiki wako:"
          : "    Notes shared to you by your peers:"}
      </Typography>
      {!props.notes || !props.notes.length > 0
        ? props.isKiswahili
          ? "Hakuna maandishi uliyoonyeshwa na marafiki wako"
          : "No notes were shared to you by your peers"
        : null}
      {props.notes.map((note) => {
        return (
          <Card className={classes.root} key={note.id} variant="outlined">
            <CardContent className={classes.cardContent}>
              <div>
                <Typography variant="h5" component="h2">
                  {note.title}
                  {" |       "}
                  <small>
                    {props.isKiswahili
                      ? " ->     iliyoshirikiwa kwako na: "
                      : " ->     shared to you by: "}
                    {note.owner.username}
                    {note.owner.first_name}
                    {note.owner.last_name}
                  </small>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {note.text}
                </Typography>
              </div>
              <div></div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

NotesSharedList.propTypes = {
  getNotesLoading: PropTypes.bool.isRequired,
  getNotesFailed: PropTypes.bool.isRequired,
  getNotesSuccess: PropTypes.bool.isRequired,
  notes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  getNotesLoading: state.sharedNotesReducer.getNotesLoading,
  getNotesFailed: state.sharedNotesReducer.getNotesFailed,
  getNotesSuccess: state.sharedNotesReducer.getNotesSuccess,
  notes: state.sharedNotesReducer.notes,
});

export default connect(mapStateToProps, { getNotes })(NotesSharedList);
