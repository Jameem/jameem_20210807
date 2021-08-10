import React, { useState, useEffect } from "react"
import { Grid } from "@material-ui/core"
import axios from "axios"

import Video from "./Video/Video"
import VideoModal from "./Video/VideoModal"

function VideoList() {
  const [videos, setVideos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  // Fetch the videos on the initial render
  useEffect(() => {
    async function getVideos() {
      const result = await axios.get("/videos").catch((error) => {
        throw error?.response?.data
      })

      // Set the state if videos are available
      if (result && result.data) setVideos(result.data.data)
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
      <h3>Video List</h3>

      {videos.length > 0 && (
        <Grid container spacing={2}>
          {videos.map((video) => {
            return (
              <Video showVideo={showVideo} videoProps={video} key={video.id} />
            )
          })}
        </Grid>
      )}

      {!videos.length && <label>Sorry, no videos found !</label>}

      <VideoModal
        open={showModal}
        handleClose={handleClose}
        selectedVideo={selectedVideo}
      />
    </div>
  )
}

export default VideoList
