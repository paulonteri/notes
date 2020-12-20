import React from "react";
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
  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <Header />
          <Switch>
            <PrivateRoute exact path="/note" component={NewNote} />
            <PrivateRoute
              exact
              path="/note/:noteId/edit"
              component={EditNote}
            />
            <PrivateRoute exact path="/note/:noteId" component={ViewNote} />
            <PrivateRoute exact path="/notes" component={NotesList} />
            <PrivateRoute exact path="/home" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* <PrivateRoute path="/" component={Dashboard} /> */}
            <PrivateRoute exact path="/" component={NotesList} />
          </Switch>
        </HashRouter>
      </Provider>
    </>
  );
}

export default App;
