import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import { CssBaseline, Container } from "@material-ui/core"

import "./App.css"
import Nav from "./components/Nav/Nav"
import VideoList from "./components/VideoList/VideoList"
import VideoUpload from "./components/VideoUpload/VideoUpload"

function App() {
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
