import React from "react"
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core"

import "./Video.css"

function Video({ showVideo, videoProps }) {
  return (
    <Grid item>
      <Card className="card" onClick={() => showVideo(videoProps.id)}>
        <CardMedia
          className="card__media"
          image={`${process.env.REACT_APP_FILE_PATH}/${videoProps.thumbnail256}`}
          title={videoProps?.title}
        />

        <CardContent>
          <Typography gutterBottom variant="h6">
            {videoProps?.title}
          </Typography>
          <Typography variant="caption">
            {videoProps?.VideoCategory?.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Video
