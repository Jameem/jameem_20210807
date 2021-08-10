import React, { useState, useEffect } from "react"
import {
  Paper,
  TextField,
  Button,
  LinearProgress,
  MenuItem,
} from "@material-ui/core"
import axios from "axios"

import "./VideoUpload.css"
import Toast from "../Toast/Toast"

function VideoUpload() {
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState("")
  const [file, setFile] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [loading, setLoading] = useState(false)
  const [toastConfig, setToastConfig] = useState({ open: false })

  useEffect(() => {
    // Fetch the categories on initial render
    async function getCategories() {
      const result = await axios
        .get("http://localhost:5000/api/video-categories")
        .catch((error) => {
          throw error?.response?.data
        })

      // Set the state if categories are available
      if (result && result.data) setCategories(result.data.data)
    }

    getCategories()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate the inputs
    if (!validateInputs()) return

    // Set up form data
    let formData = new FormData()

    const inputParams = {
      title,
      categoryId,
    }

    formData.append("videoParams", JSON.stringify(inputParams))
    formData.append("video", file)

    const config = {
      headers: { "content-type": "multipart/form-data" },
    }

    // Set loading to true for the progress bar to show
    setLoading(true)

    // Post the data
    axios
      .post("/videos", formData, config)
      .then((response) => {
        clearForm()

        setLoading(false)

        // Show success message
        setToastConfig({
          open: true,
          message: "Video uploaded successfully.",
          severity: "success",
        })
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setToastConfig({
          open: true,
          message: "Uh-oh, Something went wrong !",
          severity: "error",
        })
      })
  }

  const validateInputs = () => {
    // Make sure we have a file selected
    if (!file) {
      setToastConfig({
        open: true,
        message: "Please select a file !",
        severity: "error",
      })
      return false
    }

    // Check whether the selected file is of allowed types
    const allowedTypes = ["video/mp4", "video/mov", "video/quicktime"]

    if (!allowedTypes.includes(file.type)) {
      setToastConfig({
        open: true,
        message:
          "Please select a valid file. Allowed file type are .mp4 & .mov !",
        severity: "error",
      })
      return false
    }

    // Check whether the selected file exceeds 200 MB limit
    if (file.size > 200000000) {
      setToastConfig({
        open: true,
        message: "File size can't exceed 200 MB !",
        severity: "error",
      })
      return false
    }

    return true
  }

  const clearForm = () => {
    setTitle("")
    setCategoryId("")
    setFile(null)
  }

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setToastConfig({
      open: false,
    })
  }

  return (
    <div>
      <Paper elevation={3} className="upload__paper">
        <h4>Upload a Video</h4>

        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            type="text"
            variant="outlined"
            className="upload__input mt-20"
            required={true}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            helperText="Please enter a title for your video."
          />

          <TextField
            name="video"
            type="file"
            variant="outlined"
            className="upload__input mt-20"
            required={true}
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            inputProps={{
              accept: ".mp4,.mov",
            }}
            helperText="Please select a video. Allowed file types are .mp4 & .mov"
          />

          <TextField
            variant="outlined"
            name="categoryId"
            className="upload__input mt-20"
            select
            label="Category"
            required={true}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            helperText="Please select a video category."
          >
            {categories &&
              categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </TextField>

          {!loading && (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="upload__input mt-20"
            >
              Upload
            </Button>
          )}

          {loading && <LinearProgress className="mt-20 upload__input" />}
        </form>
      </Paper>

      <Toast config={toastConfig} handleClose={handleToastClose} />
    </div>
  )
}

export default VideoUpload
