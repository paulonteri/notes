import React, { useState } from "react";
import HomePage from "./components/HomePage";
// used to connect Redux to React & takes in the store as a prop
import { Provider } from "react-redux";
import store from "./state/store";
import { Route, HashRouter, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
//
import Header from "./components/Header";
import NewNote from "./components/notes/NewNote";
import EditNote from "./components/notes/EditNote";
import ViewNote from "./components/notes/ViewNote";
import Login from "./components/Login";
import Register from "./components/Register";
import NotesList from "./components/notes/NotesList";
//
import PrivateRoute from "./components/PrivateRoute";
//

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function usePageViews() {
  // let location = useLocation();
  React.useEffect(() => {
    // console.log(location);
    // console.log(">>>>>>>>>>>>>>");
  }, []);
}

function App() {
  const [isKiswahili, setisKiswahili] = useState(false);
  const [isLargeFont, setisLargeFont] = useState(false);

  function currTheme() {
    const drkTheme = localStorage.getItem("darkState");

    if (drkTheme && drkTheme === "true") {
      return true;
    }
    return false;
  }

  const [darkState, setDarkState] = useState(currTheme());
  const palletType = darkState ? "dark" : "light";
  const theme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
    localStorage.setItem("darkState", !darkState);
  };

  function largeFont() {
    const mediumElements = document.querySelectorAll(
      "div, p, span, input, label"
    );
    mediumElements.forEach((element) => {
      element.setAttribute("style", "font-size: x-large !important");
    });

    const largeElements = document.querySelectorAll("h2");
    largeElements.forEach((element) => {
      element.setAttribute("style", "font-size: xx-large !important");
    });

    localStorage.setItem("largeFont", true);
    setisLargeFont(true);
  }

  function smallFont() {
    const mediumElements = document.querySelectorAll(
      "div, p, span, input, label"
    );
    mediumElements.forEach((element) => {
      element.style.cssText = "font-size: medium !important";
    });

    const largeElements = document.querySelectorAll("h2");
    largeElements.forEach((element) => {
      element.style.cssText = "font-size: large !important";
    });

    localStorage.setItem("largeFont", false);
    setisLargeFont(false);
  }

  function handleFont() {
    if (isLargeFont) {
      return smallFont();
    }
    return largeFont();
  }

  function applyFont() {
    const LFont = localStorage.getItem("largeFont");

    if (LFont && LFont === "true") {
      console.log("Large font");
      return largeFont();
    }
  }

  function applyChanges() {
    applyFont();
  }

  usePageViews();
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HashRouter>
            <Header
              isKiswahili={isKiswahili}
              isLargeFont={isLargeFont}
              applyChanges={applyChanges}
              setisKiswahili={setisKiswahili}
              handleFont={handleFont}
              applyFont={applyFont}
              handleThemeChange={handleThemeChange}
            />
            <Switch>
              <PrivateRoute
                exact
                path="/note"
                component={NewNote}
                isKiswahili={isKiswahili}
                applyChanges={applyChanges}
              />
              <PrivateRoute
                exact
                path="/note/:noteId/edit"
                component={EditNote}
                isKiswahili={isKiswahili}
                applyChanges={applyChanges}
              />
              <PrivateRoute
                exact
                path="/note/:noteId"
                component={ViewNote}
                isKiswahili={isKiswahili}
                applyChanges={applyChanges}
              />
              <PrivateRoute
                exact
                path="/notes"
                component={NotesList}
                isKiswahili={isKiswahili}
                applyChanges={applyChanges}
              />
              <PrivateRoute
                exact
                path="/home"
                component={HomePage}
                isKiswahili={isKiswahili}
                applyChanges={applyChanges}
              />
              <Route
                exact
                path="/login"
                render={(props) => (
                  <Login
                    {...props}
                    isKiswahili={isKiswahili}
                    applyChanges={applyChanges}
                  />
                )}
              />
              <Route
                exact
                path="/register"
                render={(props) => (
                  <Register
                    {...props}
                    isKiswahili={isKiswahili}
                    applyChanges={applyChanges}
                  />
                )}
              />
              {/* <PrivateRoute path="/" component={Dashboard} /> */}
              <PrivateRoute
                exact
                path="/"
                component={NotesList}
                isKiswahili={isKiswahili}
                applyChanges={applyChanges}
              />
            </Switch>
          </HashRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
