import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../state/actions/auth/auth";
import PropTypes from "prop-types";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  // useEffect(() => {
  //   // handleErrorData();
  //   console.log(props);
  //   console.log("ssdsd?????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  //   // eslint-disable-next-line
  // });
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function ActualAlertComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  function handleErrorData() {
    if (props.messageTxt && props.messageTxt.length > 1) {
      setMessage(props.messageTxt);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  useEffect(() => {
    handleErrorData();
    console.log(props);
    console.log(props.messageTxt);
    // eslint-disable-next-line
  }, [props.messageTxt]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={8000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={props.isError ? "error" : "success"}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  state = {
    error: "",
    isError: true,
  };

  //
  //
  //
  //
  //
  //

  // MESSAGES
  // https://ant.design/components/message/
  messageSuccess = (messageInfo) => {
    console.log(messageInfo);
    this.setState({ message: messageInfo, isError: false });
  };

  messageError = (messageInfo) => {
    console.log(messageInfo);
    console.log("Error");
    this.setState({ message: messageInfo, isError: true });
  };

  messageWarning = (messageInfo) => {
    console.log(messageInfo);
    this.setState({ message: messageInfo, isError: true });
  };

  // NOTIFICATIONS
  // https://ant.design/components/notification/
  openNotificationWithIcon = (type, message, description) => {
    console.log({
      message: message,
      description: description,
    });
    this.setState({ message: description, isError: true });
  };

  //   TYPES: success, info, warning, error
  CustomLargeNotification = (type, message, description) => {
    console.log(type, message, description);
    console.log("CustomLargeNotification");
    this.setState({ message: description, isError: true });
  };

  //
  //
  //
  //
  //
  //

  componentDidUpdate(prevProps) {
    const { error, message } = this.props;

    if (error !== prevProps.error) {
      // HANDLE ERRORS
      this.handleError(error);
    }

    if (message !== prevProps.message) {
      // HANDLE MESSAGE
      this.handleMessage(message);
    }
  }

  //
  // Handle Messages
  //
  handleMessage = (message) => {
    if (message.success) {
      return this.messageSuccess(message.success);
    } else if (message.error) {
      return this.messageError(message.error);
    } else if (message.undefinedErrMsg) {
      return this.messageError(
        "Something went wrong. Please check your internet connection or refresh your browser."
      );
    }
  };

  //
  // Handle Errors
  //
  handleError = (error) => {
    //
    console.log(error);
    //
    //
    if (error.status === 401) {
      this.messageError("Please verify your credentials.");
      return this.props.logout();
    }
    // HTML datatype
    if (
      typeof error.msg === "string" &&
      error.msg.indexOf("<!doctype html>") &&
      error.msg.indexOf("<!doctype html>") === 1
    ) {
      console.log("error contenst type:HTML");
      return this.CustomLargeNotification("error", error.title, "Server Error");
    }
    //
    // // non_field_errors
    //
    else if (error.msg.non_field_errors) {
      console.log("Non field errors");
      this.CustomLargeNotification(
        "error",
        error.title,
        `${error.msg.non_field_errors.join()}.`
      );
    }
    // Server errors
    else if (error.status === 500) {
      // if response type is HTML

      // if response type is object
      if (typeof error.msg === "object") {
        console.log("error 500 & is obj");
        return this.CustomLargeNotification(
          "error",
          error.title,
          this.renderErrorData(error.msg)
        );
      } else {
        // if response type is not object
        console.log("error 500 str");
        return this.CustomLargeNotification("error", error.title, error.msg);
      }
    } else {
      console.log("Others");
      return this.CustomLargeNotification(
        "error",
        error.title,
        this.renderErrorData(error.msg)
      );
    }
  };

  //
  // Render Object
  //
  // https://stackoverflow.com/questions/45100477/how-render-object-in-react
  renderErrorData = (ObjectTest) => {
    // console.log("get data error");
    console.log("renderErrorData");
    let myStr = "";

    for (const [key, value] of Object.entries(ObjectTest)) {
      myStr = myStr + `${key}: ${value} `;
    }

    console.log(myStr);
    return myStr;
  };

  render() {
    return (
      <ActualAlertComponent
        messageTxt={this.state.message}
        isError={this.state.isError}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.errorsReducer,
  message: state.messagesReducer,
});

export default connect(mapStateToProps, { logout })(Alerts);
