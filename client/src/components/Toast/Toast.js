import React from "react"
import { Snackbar } from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function Toast({ handleClose, config }) {
  return (
    <Snackbar
      open={config.open}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={config?.severity}>{config?.message}</Alert>
    </Snackbar>
  )
}

export default Toast
