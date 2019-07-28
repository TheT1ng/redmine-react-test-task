import React from "react";
import "./index.scss";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "./store/configureStore";

const App = () => (
  <Provider store={store()}>
    <AppRouter />
  </Provider>
);

export default App;
