import React, { useState, useEffect } from "react"
import { Grid } from "@material-ui/core"
import axios from "axios"

import Video from "./Video/Video"
import VideoModal from "./Video/VideoModal"

function VideoList() {
  const [videos, setVideos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    async function getVideos() {
      const result = await axios
        .get("http://localhost:5000/api/videos")
        .catch((error) => {
          throw error?.response?.data
        })

      // Set the state if offers available else showing an error message
      if (result && result.data) {
        setVideos(result.data.data)
      } else {
      }
    }

    getVideos()
  }, [])

  const showVideo = (id) => {
    const video = videos.find((v) => v.id === id)
    setSelectedVideo(video)
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div>
      <h4>Video List</h4>

      <Grid
        container
        spacing={2}
        style={{ marginTop: "5px", flexStart: "left" }}
        data-testid="offer"
      >
        {videos &&
          videos.map((video) => {
            return (
              <Video showVideo={showVideo} videoProps={video} key={video.id} />
            )
          })}
      </Grid>

      <VideoModal
        open={showModal}
        handleClose={handleClose}
        selectedVideo={selectedVideo}
      />
    </div>
  )
}

export default VideoList
