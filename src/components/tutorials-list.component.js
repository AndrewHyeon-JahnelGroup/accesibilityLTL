import React, { Component, useState, useEffect } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import CustomInput from "./CustomInput";
import { styles } from "../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";
import LoginForm from './LoginForm'
const TutorialsList = (props) => {
  const [tutorials, setTutorials]= useState()
  const [currentTutorial, setCurrentTutorial] = useState()
  const [ currentIndex, setCurrentIndex ] = useState()
  // const [ searchTitle, setSearchTitle] = useState()
  const classes = withStyles(props.classes)
  useEffect(() => {
    retrieveTutorials()
  }, [])

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  const retrieveTutorials = (e) => {
    TutorialDataService.getAll()
      .then(response => {
        setTutorials(response.data)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const refreshList = (e) =>  {
    this.retrieveTutorials();
    setCurrentIndex(-1)
    setCurrentTutorial(null)
  }

  const setActiveTutorial= (tutorial, index) =>  {
    setCurrentIndex(tutorial)
    setCurrentTutorial(index)
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  const removeAllTutorials  = (e) =>  {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  const searchTitle = (e) =>  {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

  return (
    <div className={classes.form}>
      <Grid container>
        <Grid className={classes.search} item sm={12} xs={12} md={12} xl={12} lg={12}>
          <TextField
            label="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <Button
            size="small"
            variant="outlined"
            className={classes.textField}
            onClick={searchTitle}>
            Search
          </Button>
        </Grid>
        <Grid item md={4}>
          <h2>Tutorials List</h2>

          <div className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <ListItem
                  selected={index === currentIndex}
                  onClick={() => setActiveTutorial(tutorial, index)}
                  divider
                  button	
                  key={index}>
                  {tutorial.title}
                </ListItem>
              ))}
          </div>

          <Button
            className={`${classes.button} ${classes.removeAll}`}
            size="small"
            color="secondary"
            variant="contained"
            onClick={removeAllTutorials}
          >
            Remove All
        </Button>
        </Grid>
        <Grid item md={8}>
          {currentTutorial ? (
            <div className={classes.tutorial}>
              <h4>Tutorial</h4>
              <div className={classes.detail}>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div className={classes.detail}>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div className={classes.detail}>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className={classes.edit}
              >
                Edit
            </Link>
            </div>
          ) : (
              <div>
                <br />
                <p className={classes.tutorial}>Please click on a Tutorial...</p>
                <form className="form">
        <Button type="button" color="primary" className="form__custom-button">
          Log in
        </Button>
      </form>
      <LoginForm
        rememberMe={{
          label: 'Remember Me Checkbox',
          onChange: onChangeSearchTitle,
          checked: false
        }}
        username={{
          inputLabel: "Enter your username",
          forgotLabel: "Forgot username?",
          onForgotClick: ()=> {console.log("forgot")}
        }}
        password={{
          inputLabel: "Enter your password",
          forgotLabel: "Forgot Password?",
          onForgotClick: ()=> {console.log("forgot")}
        }}
        socialLogin={{
          restrictedSocial: false,
          socialPlatforms: ['facebook', 'twitter', 'linkeding'],
          loginWithLabel: ''
        }}
        submit={{
          onClick: ()=>{console.log("submitted")},
          label: "Submit Button",
          disabled: false
        }}
      />
              </div>
            )}
        </Grid>
      </Grid>
    </div>
  );
  
}

export default withStyles(styles)(TutorialsList)