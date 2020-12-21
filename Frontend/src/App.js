import React, { useState } from "react";
import HomePage from "./components/HomePage";
// used to connect Redux to React & takes in the store as a prop
import { Provider } from "react-redux";
import store from "./state/store";
import { Route, HashRouter, Switch } from "react-router-dom";
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

function App() {
  const [isKiswahili, setisKiswahili] = useState(false);

  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <Header isKiswahili={isKiswahili} setisKiswahili={setisKiswahili} />
          <Switch>
            <PrivateRoute
              exact
              path="/note"
              component={NewNote}
              isKiswahili={isKiswahili}
            />
            <PrivateRoute
              exact
              path="/note/:noteId/edit"
              component={EditNote}
              isKiswahili={isKiswahili}
            />
            <PrivateRoute
              exact
              path="/note/:noteId"
              component={ViewNote}
              isKiswahili={isKiswahili}
            />
            <PrivateRoute
              exact
              path="/notes"
              component={NotesList}
              isKiswahili={isKiswahili}
            />
            <PrivateRoute
              exact
              path="/home"
              component={HomePage}
              isKiswahili={isKiswahili}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} isKiswahili={isKiswahili} />}
            />
            <Route
              exact
              path="/register"
              render={(props) => (
                <Register {...props} isKiswahili={isKiswahili} />
              )}
            />
            {/* <PrivateRoute path="/" component={Dashboard} /> */}
            <PrivateRoute
              exact
              path="/"
              component={NotesList}
              isKiswahili={isKiswahili}
            />
          </Switch>
        </HashRouter>
      </Provider>
    </>
  );
}

export default App;
