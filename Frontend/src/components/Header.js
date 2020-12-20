import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    margin: 5,
    marginBottom: 10,
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  buttons: {
    flex: 1.3,
    // backgroundColor: "green",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    margin: 5,
  },
});

const Header = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      {props.isAuthenticated ? (
        <>
          <Container style={{ flex: 0.2 }}>
            <Link to={`/notes`}>
              <p>Notes App</p>
            </Link>
          </Container>
          <Container className={classes.buttons}>
            <Link to={`/note`}>
              <Button className={classes.button} variant="contained">
                Shared Notes
              </Button>
            </Link>
            <Link to={`/note`}>
              <Button className={classes.button} variant="contained">
                New Note
              </Button>
            </Link>
          </Container>
        </>
      ) : (
        <Container style={{ height: 50 }} />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps)(Header);
