import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";
import { Provider } from "react-redux";
import Alert from "./components/layouts/Alert";
import setAuthToken from "./utills/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-files/CreateProfile";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />{" "}
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />{" "}
              <Route exact path="/login" component={Login} />{" "}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />{" "}
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />{" "}
            </Switch>{" "}
          </section>{" "}
        </Fragment>{" "}
      </Router>{" "}
    </Provider>
  );
};

export default App;
