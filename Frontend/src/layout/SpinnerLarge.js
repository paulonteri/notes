import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: window.screen.width / 1.05,
    height: window.screen.height / 1.4,
    margin: 5,
    marginBottom: 10,
    // backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const SpinnerLarge = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <MoonLoader size={70} color={"#123abc"} />
    </Container>
  );
};

export default SpinnerLarge;
