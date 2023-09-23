import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import AllReducers from "./redux/reducers/AllReducers";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import { HashRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { APP_NAME } from "./constant";
import i18next from "i18next";

const store = createStore(
  AllReducers,
  process.env.REACT_APP_SECRET_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

const i18n = (key) => i18next.t(`page.sign_in.${key}`);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HashRouter>
      <Helmet>
        <title>
          {`${APP_NAME}-
          ${i18n("backendCms")}`}
        </title>
      </Helmet>
      <App />
    </HashRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
