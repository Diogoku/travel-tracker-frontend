import React from "react";

// REACT-ROUTER-DOM
import { HashRouter, Switch } from "react-router-dom";

// PRIVATE ROUTE
import PrivateRoute from "./routes/PrivateRoute";

// AFTER LOGIN ROUTE
import AfterLoginRoute from "./routes/AfterLoginRoute";

// COMPONENTS
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import MapPage from "./components/MapPage";

// CSS
import "./css/App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <HashRouter basename="/">
        <Switch>
          <AfterLoginRoute component={Dashboard} exact path="/" />
          <PrivateRoute component={MapPage} exact path="/map/:userId" />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
