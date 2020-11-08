import React from "react";
import HomePage from "./components/HomePage";
// used to connect Redux to React & takes in the store as a prop
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}

export default App;
