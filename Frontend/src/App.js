import React from "react";
import HomePage from "./components/HomePage";
// used to connect Redux to React & takes in the store as a prop
import { Provider } from "react-redux";
import store from "./state/store";
import { Route, HashRouter, Switch } from "react-router-dom";
//
import Header from "./components/Header";
import Note from "./components/notes/Note";
import EditNote from "./components/notes/EditNote";
import Login from "./components/Login";
import NotesList from "./components/notes/NotesList";

function App() {
  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <Header />
          <Switch>
            <Route exact path="/note" component={Note} />
            <Route exact path="/note/:noteId/edit" component={EditNote} />
            <Route exact path="/note/:noteId" component={Note} />
            <Route exact path="/notes" component={NotesList} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/login" component={Login} />
            {/* <PrivateRoute path="/" component={Dashboard} /> */}
            <Route exact path="/" component={Login} />
          </Switch>
        </HashRouter>
      </Provider>
    </>
  );
}

export default App;
