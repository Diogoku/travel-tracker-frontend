import React, { useState } from "react";

// MATERIAL-UI
import Card from "@material-ui/core/Card";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// REACT-SWIPEABLE-VIEWS
import SwipeableViews from "react-swipeable-views";

// COMPONENTS
import Login from "./Login";
import Register from "./Register";

// CSS
import "../css/dashboard.css";

function Dashboard() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="dashboard">
      <Card className="dashboard__container">
        <div className="dashboard__containerText">
          <h1>Join us</h1>
          <h4>
            and have the opportunity to know how much percent you know in the
            world
          </h4>
        </div>
        <div className="tabs">
          <AppBar position="static" color="default">
            <Tabs
              value={tabIndex}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Login" onClick={() => setTabIndex(0)} />
              <Tab label="Register" onClick={() => setTabIndex(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews index={tabIndex}>
            <Login />
            <Register />
          </SwipeableViews>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
