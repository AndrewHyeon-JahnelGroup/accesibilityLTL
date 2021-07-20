import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { styles } from "./css-common"

import AddTutorial from "./components/add-tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import BadTutorial  from "./components/BadTutorial";
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import LoginForm from "./components/LoginForm"
const App = (props) => {
    const { classes } = props

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Typography className={classes.name} variant="h6">
              bezKoder
            </Typography>
            <Link to={"/tutorials"} className={classes.link}>
              <Typography variant="body2">
                Tutorials
              </Typography>
            </Link>
            <Link to={"/add"} className={classes.link}>
              <Typography variant="body2">
                Add
            </Typography>
            </Link>
          </Toolbar>
        </AppBar>

          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            {/* <Route exact path="/login" component={LoginForm} /> */}
            {/* <Route path="/tutorials/:id" component={Tutorial} /> */}
            <Route path="/badtutorials/" component={BadTutorial} />
          </Switch>
      </div>
    );
  }


export default withStyles(styles)(App);