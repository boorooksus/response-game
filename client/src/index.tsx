import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";

import Reducer from "./_reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

// const store = createStore(Reducer, composeEnhancers());

// const store = createStore(Reducer, composeWithDevTools());

const store = createStore(Reducer);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
