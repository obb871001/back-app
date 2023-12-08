import { applyMiddleware, compose, createStore } from "redux";
import AllReducers from "./reducers/AllReducers";
import {
  apiErrorMessage,
  initializeApi,
  periodicDataUpdater,
  userLogout,
} from "./middleware";

const enhancers = [];
const middleware = [
  userLogout,
  apiErrorMessage,
  periodicDataUpdater,
  initializeApi,
];

if (
  process.env.REACT_APP_SECRET_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(AllReducers, composedEnhancers);

export default store;
