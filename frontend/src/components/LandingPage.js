import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {config} from "../App";
import  Dashboard  from "./Dashboard";
import Header from "./Header";
import FilterPanel from "./FilterPanel";
import UploadVideoModal from "./UploadVideoModal";
import { TextField, Button,Box } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SearchIcon from '@mui/icons-material/Search';
import "./LandingPage.css";

const LandingPage = () =>{
    const { enqueueSnackbar } = useSnackbar();
    const [videoList, updateVideo] = useState([]);
    const [debounceTimer, updateTimer] = useState(0);
    const [searchVideos, searchedVideos] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        const onLoad = async () => {
            const videosData = await performAPICall();
        }
        onLoad();
    },[]);

    const performAPICall = async () =>{
        try {
            const response = await axios(`${config.endpoint}`);
            updateVideo(response.data.videos);
            searchedVideos(response.data.videos);
            return response.data.videos;
        } catch (error) {
            if(error.response && error.response.status === 500){
                enqueueSnackbar(error.response.message,{variant:'error'});
                return null;
            }
            else{
                enqueueSnackbar("Something went wrong. Check the backend console for more details",{variant:'error'});
            }
        }
    }
    const performSortCall = async () =>{
        try { 
            let sortOption = JSON.parse(localStorage.getItem('filters'));
            let sortValue;
            if(!sortOption)
            sortValue = "releaseDate";
            else
            sortValue = sortOption["sortBy"];
            // let sortOption = JSON.parse(localStorage.getItem('filters'));
            const response = await axios(`${config.endpoint}?sortBy=${sortValue}`);
            // updateVideo(response.data.videos);
            searchedVideos(response.data.videos);
            return true;
            // return response.data.videos;
        } catch (error) {
            if(error.response && error.response.status === 500){
                enqueueSnackbar(error.response.message,{variant:'error'});
                return null;
            }
            else{
                enqueueSnackbar(error.response.data.message,{variant:'error'});
            }
        }
    }
    const performContentRatingFilter = async () =>{
        try { 
            let ageOption = JSON.parse(localStorage.getItem('filters'));
            let ageValue;
            if(!ageOption)
            ageValue = encodeURIComponent("Anyone");
            else
            ageValue = encodeURIComponent(ageOption["ageRating"]);
            const response = await axios(`${config.endpoint}?contentRating=${ageValue}`);
            searchedVideos(response.data.videos);
            return true;
        } catch (error) {
            if(error.response && error.response.status === 500){
                enqueueSnackbar(error.response.message,{variant:'error'});
                return null;
            }
            else{
                enqueueSnackbar(error.response.data.message,{variant:'error'});
            }
        }
    }

    const performGenreFilter = async () =>{
        try { 
            let genreOptions = JSON.parse(localStorage.getItem('filters'));
            let genreValues;
            if(!genreOptions)
            genreValues = ['All'];
            else
            genreValues = genreOptions["genres"];
           const response = await axios(`${config.endpoint}?genres=${genreValues.join(',')}`);
           searchedVideos(response.data.videos);
           return true;
        } catch (error) {
            if(error.response && error.response.status === 500){
                enqueueSnackbar(error.response.message,{variant:'error'});
                return null;
            }
            else{
                enqueueSnackbar(error.response.data.message,{variant:'error'});
            }
        }
    }
    const handleSearch = (event,debounceTimeout) =>{
        const text = event.target.value;

        if(debounceTimeout)
        clearTimeout(debounceTimeout);

        const timer = setTimeout(() => { performSearch(text)}, 500);
        updateTimer(timer);
    }
    const performSearch = async(keyword) => {
        try {
            const response = await axios(`${config.endpoint}/?title=${keyword}`);
            // console.log("Searched videos",response.data.videos);
            searchedVideos(response.data.videos);
        } catch (error) {
            if(error.response){
                if(error.response.status === 404){
                    enqueueSnackbar(error.response.message,{variant:'error'});
                    searchedVideos([]);
                }
                if(error.response.status === 500){
                enqueueSnackbar(error.response.message,{variant:'error'});
                updateVideo(videoList);
                }
            }else{
                enqueueSnackbar("Could not fetch videos. Check the backend console for more details",{variant:'error'});
            }
        }
    }
    const handleModalOpen = () => {
        setOpen(true);
    }
    const handleModalClose = () => {
        setOpen(false);
    }
    
    return (
        <div>
        <Header>
            <Box className="searchBox">
            <TextField className="searchText" size="small" 
            placeholder="Search" name="search" onChange={(e) => handleSearch(e,debounceTimer)}
            variant="standard"
            InputProps={{
                sx:{color:"#606060", fontSize:'16px', bgcolor:"#121212"},className: "search",
                disableUnderline: true }}/>
            <Box className="searchicon">
                <SearchIcon sx={{color:"#606060",paddingTop:0.4}} />
            </Box></Box>
            <Button className="uploadBtn" variant="contained"
             onClick={handleModalOpen} startIcon={<FileUploadIcon className="uploadIcon" />}>Upload</Button>
        </Header>
        <FilterPanel handleSort={performSortCall} handleContentRating={performContentRatingFilter} handleGenres={performGenreFilter}></FilterPanel>
        <Dashboard videos={searchVideos}></Dashboard>
        <UploadVideoModal open={open} handleClose={handleModalClose}></UploadVideoModal>
        </div>
    );
}

export default LandingPage;