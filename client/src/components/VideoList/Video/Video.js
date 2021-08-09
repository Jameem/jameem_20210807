import React, { useState } from "react"
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  CardHeader,
  Button,
  Modal,
} from "@material-ui/core"

import "./Video.css"

function Video({ showVideo, videoProps }) {
  return (
    <Grid item>
      <Card className="card" onClick={() => showVideo(videoProps.id)}>
        <CardMedia
          className="card__media"
          image={`http://localhost:5000/${videoProps.thumbnail256}`}
          title={videoProps?.title}
        />

        <CardContent style={{ flexGrow: "1" }}>
          <Typography gutterBottom variant="h6">
            {videoProps?.title}
          </Typography>
          <Typography gutterBottom variant="caption">
            {videoProps?.VideoCategory?.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Video
