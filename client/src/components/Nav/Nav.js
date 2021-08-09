import React from "react"
import { NavLink } from "react-router-dom"
import { AppBar, Toolbar } from "@material-ui/core"
import Button from "@material-ui/core/Button"

import "./Nav.css"

function Nav() {
  return (
    <AppBar position="relative" className="nav">
      <Toolbar className="nav__toolbar">
        <NavLink to="/" className="nav__logo">
          <h1>Video Gallery</h1>
        </NavLink>

        <Button
          component={NavLink}
          to="/upload"
          variant="contained"
          color="primary"
        >
          Upload a Video
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
