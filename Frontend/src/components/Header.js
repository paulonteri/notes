import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();

  useEffect(() => {
    console.log("route has been changed");
    console.log(location.pathname);
    props.applyFont();
  }, [location.pathname]);

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
            <Button
              className={classes.button}
              variant="contained"
              onClick={props.handleFont}
            >
              Large Font
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              onClick={props.handleThemeChange}
            >
              Theme
            </Button>
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
