import React, { useState } from "react";
import HomePage from "./components/HomePage";
// used to connect Redux to React & takes in the store as a prop
import { Provider } from "react-redux";
import store from "./state/store";
import { Route, HashRouter, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
//
import Alerts from "./components/Alerts";
import Header from "./components/Header";
import NewNote from "./components/notes/NewNote";
import EditNote from "./components/notes/EditNote";
import ViewNote from "./components/notes/ViewNote";
import Login from "./components/Login";
import Register from "./components/Register";
import NotesList from "./components/notes/NotesList";
import NotesSharedList from "./components/notes/NotesSharedList";
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

  const handleLanguageChange = () => {
    localStorage.setItem("isKiswahili", !isKiswahili);
    setisKiswahili(!isKiswahili);
  };

  function currLanguage() {
    const lang = localStorage.getItem("isKiswahili");
    console.log("isKiswahili", lang);

    if (lang && lang === "true") {
      if (!isKiswahili) {
        setisKiswahili(true);
      }
    } else {
      if (isKiswahili) {
        setisKiswahili(false);
      }
    }
  }

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
    localStorage.setItem("darkState", !darkState);
    setDarkState(!darkState);
  };

  function largeFont() {
    console.log("largeFont()");
    setisLargeFont(true);
    localStorage.setItem("largeFont", true);

    const mediumElements = document.querySelectorAll("p, span, input, label");
    mediumElements.forEach((element) => {
      element.setAttribute("style", "font-size: large !important");
    });

    const largeElements = document.querySelectorAll("h2");
    largeElements.forEach((element) => {
      element.setAttribute("style", "font-size: x-large !important");
    });
  }

  function smallFont() {
    console.log("smallFont()");
    setisLargeFont(false);
    localStorage.setItem("largeFont", false);

    const mediumElements = document.querySelectorAll("p, span, input, label");
    mediumElements.forEach((element) => {
      element.style.cssText = "font-size: medium !important";
    });

    const largeElements = document.querySelectorAll("h2");
    largeElements.forEach((element) => {
      element.style.cssText = "font-size: large !important";
    });
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
      return largeFont();
    } else if (isLargeFont) {
      return smallFont();
    }
  }

  function applyChanges() {
    setTimeout(function () {
      applyFont();
    }, 50);
  }

  usePageViews();
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HashRouter>
            <Alerts />
            <Header
              isKiswahili={isKiswahili}
              isLargeFont={isLargeFont}
              applyChanges={applyChanges}
              setisKiswahili={setisKiswahili}
              handleFont={handleFont}
              applyFont={applyFont}
              currLanguage={currLanguage}
              handleThemeChange={handleThemeChange}
              handleLanguageChange={handleLanguageChange}
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
                path="/notes/shared-with-me"
                component={NotesSharedList}
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
