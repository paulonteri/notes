import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { logout } from "../state/actions/auth/auth";

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

  rootSmall: {
    margin: 5,
    marginBottom: 10,
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonsSmall: {
    // backgroundColor: "green",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonSmall: {
    margin: 10,
    minWidth: "300px",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const Header = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const matches = useMediaQuery("(max-width:800px)");
  const [isVisible, setisVisible] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      props.applyFont();
      props.currLanguage();
    }, 5);
    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    console.log(matches);
  }, [matches]);

  function onIconClick() {
    console.log("clicked");
    setisVisible(!isVisible);
  }

  return (
    <Container className={matches ? classes.rootSmall : classes.root}>
      {props.isAuthenticated ? (
        <>
          <Container>
            {!matches ? (
              <Link
                onClick={onIconClick}
                to={`/notes`}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
                <LibraryBooksIcon
                  style={{
                    marginTop: props.isLargeFont ? 32 : 15,
                    fontSize: props.isLargeFont ? 35 : 25,
                    marginRight: props.isLargeFont ? 10 : 5,
                  }}
                />
                <h2>{props.isKiswahili ? "Maandishi yangu" : "My Notes"}</h2>
              </Link>
            ) : (
              <Container className={classes.topContainer}>
                <Link
                  onClick={onIconClick}
                  to={`/notes`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                  }}
                >
                  <LibraryBooksIcon
                    style={{
                      marginTop: props.isLargeFont ? 32 : 15,
                      fontSize: props.isLargeFont ? 35 : 25,
                      marginRight: props.isLargeFont ? 10 : 5,
                    }}
                  />
                  <h2>{props.isKiswahili ? "Maandishi yangu" : "My Notes"}</h2>
                </Link>
                <div onClick={onIconClick}>
                  <MenuIcon
                    style={{ fontSize: 50, margin: 17, color: "purple" }}
                  />
                </div>
              </Container>
            )}
          </Container>
          {!matches || isVisible ? (
            <Container
              className={matches ? classes.buttonsSmall : classes.buttons}
            >
              <Link onClick={onIconClick} to={`/notes/shared-with-me`}>
                <Button
                  size="small"
                  className={matches ? classes.buttonSmall : classes.button}
                  variant="contained"
                  type=""
                >
                  {props.isKiswahili ? "Maandishi ya wengine" : "Shared Notes"}
                </Button>
              </Link>
              <Link onClick={onIconClick} to={`/note`}>
                <Button
                  size="small"
                  className={matches ? classes.buttonSmall : classes.button}
                  variant="contained"
                >
                  {props.isKiswahili ? "Maandishi mapya" : "New note"}
                </Button>
              </Link>
              <Button
                size="small"
                className={matches ? classes.buttonSmall : classes.button}
                variant="contained"
                onClick={() => {
                  onIconClick();
                  props.handleFont();
                }}
              >
                {!props.isLargeFont
                  ? props.isKiswahili
                    ? "Herufi kubwa"
                    : "Large font"
                  : props.isKiswahili
                  ? "Herufi Ndogo "
                  : "Small font"}
              </Button>
              <Button
                size="small"
                className={matches ? classes.buttonSmall : classes.button}
                variant="contained"
                onClick={() => {
                  onIconClick();
                  props.handleThemeChange();
                }}
              >
                {props.isKiswahili ? "Rangi" : "Theme"}
              </Button>
              <Button
                size="small"
                className={matches ? classes.buttonSmall : classes.button}
                variant="contained"
                onClick={() => {
                  onIconClick();
                  props.handleLanguageChange();
                }}
              >
                {props.isKiswahili ? "English" : "Kiswahili"}
              </Button>
              <Button
                size="small"
                className={matches ? classes.buttonSmall : classes.button}
                variant="contained"
                onClick={() => {
                  onIconClick();
                  props.logout();
                }}
              >
                {props.isKiswahili ? "Ondoka" : "Logout"}
              </Button>
            </Container>
          ) : null}
        </>
      ) : (
        <>
          <Container>
            {!matches ? (
              <Link
                disabled
                style={{
                  // backgroundColor: "red",
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
                <LibraryBooksIcon
                  style={{
                    marginTop: props.isLargeFont ? 32 : 15,
                    fontSize: props.isLargeFont ? 35 : 25,
                    marginRight: props.isLargeFont ? 10 : 5,
                  }}
                />
                <h2>
                  {props.isKiswahili ? "Programu ya maandishi" : "Notes App"}
                </h2>
              </Link>
            ) : (
              <Container className={classes.topContainer}>
                <Link
                  disabled
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                  }}
                >
                  <LibraryBooksIcon
                    style={{
                      marginTop: props.isLargeFont ? 32 : 15,
                      fontSize: props.isLargeFont ? 35 : 25,
                      marginRight: props.isLargeFont ? 10 : 5,
                    }}
                  />
                  <h2>
                    {props.isKiswahili ? "Programu ya maandishi" : "Notes App"}
                  </h2>
                </Link>
                <div onClick={onIconClick}>
                  <MenuIcon
                    style={{ fontSize: 50, margin: 17, color: "purple" }}
                  />
                </div>
              </Container>
            )}
          </Container>
          {!matches || isVisible ? (
            <Container
              className={matches ? classes.buttonsSmall : classes.buttons}
            >
              <Button
                size="small"
                className={matches ? classes.buttonSmall : classes.button}
                variant="contained"
                onClick={() => {
                  onIconClick();
                  props.handleFont();
                }}
              >
                {!props.isLargeFont
                  ? props.isKiswahili
                    ? "Herufi kubwa"
                    : "Large font"
                  : props.isKiswahili
                  ? "Herufi Ndogo "
                  : "Small font"}
              </Button>
              <Button
                size="small"
                className={matches ? classes.buttonSmall : classes.button}
                variant="contained"
                onClick={() => {
                  onIconClick();
                  props.handleThemeChange();
                }}
              >
                {props.isKiswahili ? "Rangi" : "Theme"}
              </Button>
              <Button
                size="small"
                className={matches ? classes.buttonSmall : classes.button}
                variant="contained"
                onClick={() => {
                  onIconClick();
                  props.handleLanguageChange();
                }}
              >
                {props.isKiswahili ? "English" : "Kiswahili"}
              </Button>
            </Container>
          ) : null}
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps, { logout })(Header);
