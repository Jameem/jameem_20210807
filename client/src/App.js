import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import axios from "axios"
import { Container } from "@material-ui/core"

import "./App.css"
import Nav from "./components/Nav/Nav"
import VideoList from "./components/VideoList/VideoList"
import VideoUpload from "./components/VideoUpload/VideoUpload"

function App() {
  //Set the base url for the api
  axios.defaults.baseURL = process.env.REACT_APP_API_URL

  return (
    <Router>
      <Container>
        <Nav />

        <Switch>
          <Route path="/upload" component={VideoUpload} exact />

          <Route path="/" component={VideoList} exact />
        </Switch>
      </Container>
    </Router>
  )
}

export default App
