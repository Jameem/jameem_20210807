import React from "react"
import { Modal, Typography } from "@material-ui/core"
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined"

import "./VideoModal.css"

function VideoModal({ open = false, handleClose, selectedVideo }) {
  return (
    <div>
      <Modal open={open} className="modal">
        <div className="modal__body">
          <div className="modal__header">
            <Typography variant="h6">{selectedVideo?.title}</Typography>

            <HighlightOffOutlinedIcon
              onClick={handleClose}
              className="pointer"
            />
          </div>

          <video width="100%" controls>
            <source
              src={`${process.env.REACT_APP_FILE_PATH}/${selectedVideo?.filePath}`}
            />
          </video>
        </div>
      </Modal>
    </div>
  )
}

export default VideoModal
