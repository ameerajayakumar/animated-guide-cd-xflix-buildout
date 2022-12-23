import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import {Dialog, DialogTitle, DialogContent, MenuItem, TextField, DialogActions, Button, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import {config} from "../App";
import "./UploadVideoModal.css";

const CssTextField = styled(TextField)({
  '& label': {
    color: '#ffffffde',
  },
  '& label.Mui-focused': {
    color: '#ffffff1f',
  },
  // '& .MuiInput-underline:after': {
  //   borderBottomColor: 'green',
  // },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ffffff1f',
      border:'1px solid',
    },
  '&:hover fieldset': {
      borderColor: '#ffffff1f',
      border:'1px solid',
    },
  '&.Mui-focused fieldset': {
      borderColor: '#ffffff1f',
      border:'1px solid',
    },
  },
});

const UploadVideoModal = ({open, handleClose}) =>{

//   useEffect(()=>{
//     (async() => {
//         if(!open)
//         {
// dateValue(null);
//   setVideoData({
//     videoLink: "",
//     title: "",
//     genre: "",
//     contentRating: "",
//     releaseDate: null,
//     previewImage: ""
//   });
//         }
//     })()
// },[open]);

  const genreData = [
    { value: 'All', label: 'All Genre' },
    { value: 'Education', label: 'Education' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Movies', label: 'Movies'},
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Lifestyle', label: 'Lifestyle' },];
  const ageData = [
      { value: 'Anyone', label: 'Any age group' },
      { value: '7+', label: '7+' },
      { value: '12+', label: '12+' },
      { value: '16+', label: '16+' },
      { value: '18+', label: '18+' },];

  const { enqueueSnackbar } = useSnackbar();
  const [dateValue, setDateValue] = useState(null);
  const [videoData, setVideoData] = useState({
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: null,
    previewImage: ""
  });
  const calcDate = (newDate) => {
    const date = new Date(newDate);
    const monthShort = date.toLocaleString('default', { month: 'short' });
    const newReleaseDate = `${date.getDate()} ${monthShort} ${date.getFullYear()} `;
    setDateValue(newDate);
    setVideoData({
      ...videoData,
      releaseDate: newReleaseDate
    })
  }
  const handleFormChange = (e) => {
    const value = e.target.value;
    setVideoData({
      ...videoData,
      [e.target.name]: value
    });
  };
  const handleUploadVideo = async() => {
  const newVideo = {
        "videoLink": videoData.videoLink,
        "title": videoData.title,
        "genre": videoData.genre,
        "contentRating": videoData.contentRating,
        "releaseDate": videoData.releaseDate,
        "previewImage": videoData.previewImage
  };
  const headers = {
    "content-type": "application/json"
  };
  try {
    const resp = await axios.post(`${config.endpoint}s`, JSON.stringify(newVideo), {headers: headers});
    if(resp.data) {
      enqueueSnackbar("New Video Uploaded!",{variant:'success'});
      handleClose();
      setDateValue(null);
      setVideoData({
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: null,
    previewImage: ""
  });
    }
    return true;
 } catch (error) {
    if(error.response && error.response.status === 500){
      enqueueSnackbar(error.response.message,{variant:'error'});
  }
  else{
      enqueueSnackbar("Something went wrong. Check the backend console for more details",{variant:'error'});
  }
  } 
  handleClose();
  setDateValue(null);
  setVideoData({
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: null,
    previewImage: ""
  });
  
  }

    return (
      // disableEnforceFocus={true}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" >
        <DialogTitle>Upload Video</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon sx={{color: "#ffffffde"}}/>
        </IconButton>
        <DialogContent className='content' sx={{display:"flex", flexDirection:"column", justifyContent:"space-between" }} >
        <CssTextField
          className='textbox'
          variant="outlined"
          value={videoData.videoLink}
          name="videoLink"
          InputProps={{
            sx:{color:"#6200EE", fontSize:'16px'}}}
          id="videoLink"
          label="Video Link"
          helperText="This link will be used to derive the video"
          onChange={handleFormChange}
        />
        <CssTextField
          className='textbox'
          value={videoData.previewImage}
          name="previewImage"
          id="imageLink"
          label="Thumbnail Image Link"
          helperText="This link will be used to preview the thumbnail image"
          onChange={handleFormChange}
        />
        <CssTextField
          className='textbox'
          id="title"
          label="Title"
          value={videoData.title}
          name="title"
          helperText="The title will be the representative text for video"
          onChange={handleFormChange}
        />
        <CssTextField
          className='textbox'
          id="genre"
          select
          label="Genre"
          helperText="Genre will help in categorizing your videos"
          onChange={handleFormChange}
          defaultValue = ""
          name="genre"
          value={videoData.genre}
        >
          {genreData.map((option) => (
            // disableAutoFocus={true} disableEnforceFocusdisableRestoreFocus
            <MenuItem key={option.value} value={option.value} >
              {option.label}
            </MenuItem>
          ))}
        </CssTextField>
        <CssTextField
          className='textbox'
          id="rating"
          select
          label="Suitable age group for the clip"
          helperText="This will be used to filter videos on age group suitability"
          onChange={handleFormChange}
          defaultValue = ""
          name="contentRating"
          value={videoData.contentRating}
        >
          {ageData.map((option) => (
            <MenuItem key={option.value} value={option.value} >
              {option.label}
            </MenuItem>
          ))}
        </CssTextField>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker
        label="Release Date"
        name="releaseDate"
        value={dateValue}
        inputFormat="DD/MM/YYYY"
        onChange={(newValue) => {
          calcDate(newValue)
        }}
        renderInput={(params) => <CssTextField {...params} />}
      />
    </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadVideo} className="submitBtn">UPLOAD VIDEO</Button>
          <Button onClick={handleClose} className="cancelBtn">CANCEL</Button>
        </DialogActions>
      </Dialog>
    );
}

export default UploadVideoModal;