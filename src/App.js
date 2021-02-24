import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Login from "./pages/LoginPage";
import Users from "./pages/UsersPage";


export default function App(props) {
  return (
    <Router> 
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}




