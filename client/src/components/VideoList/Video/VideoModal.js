import React, { useState } from "react"
import { Modal, Typography } from "@material-ui/core"
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined"

import "./VideoModal.css"

function VideoModal({ open = false, handleClose, selectedVideo }) {
  return (
    <div>
      <Modal open={open} className="modal">
        <div className="modal__body">
          <div className="modal__header">
            <Typography gutterBottom variant="h6">
              {selectedVideo?.title}
            </Typography>
            <HighlightOffOutlinedIcon
              onClick={handleClose}
              className="pointer"
            />
          </div>

          <video width="100%" controls>
            <source
              //   src="http://localhost:5000/uploads/videos/1628395050264.mp4"
              src={`http://localhost:5000/${selectedVideo?.filePath}`}
              type="video/mp4"
            />
          </video>
        </div>
      </Modal>
    </div>
  )
}

export default VideoModal
