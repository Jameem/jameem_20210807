import React, { useState } from "react"
import { CssBaseline, Container } from "@material-ui/core"

import "./App.css"
import Nav from "./components/Nav/Nav"
import VideoList from "./components/VideoList/VideoList"

function App() {
  return (
    <Container>
      <Nav />

      <VideoList />
    </Container>
  )
}

export default App
