import React, { useState } from "react";
import Db from "./components/DataBase";
import Navbar from "./components/Navbar";
import { SignIn, SignUp } from "./components/Login_Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from "./components/Home";
import { Home, Services, Products } from "./components/pages";
function App() {
  Db.ping(
    {
      requestTimeout: Infinity,
    },
    function (error) {
      if (error) {
        console.trace("elasticsearch cluster is down!");
      } else {
        console.log("Database is Connected");
      }
    }
  );

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/services" component={Services} />
          <Route path="/products" component={Products} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
