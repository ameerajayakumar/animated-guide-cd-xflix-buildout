import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {config} from "../App";
import  Dashboard  from "./Dashboard";
import { Box, Stack, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "./Header";
import {ReactComponent as Like} from "../assets/like.svg";
import {ReactComponent as Dislike} from "../assets/dislike.svg";
import "./VideoPage.css";
import { Typography } from "@mui/material";

const VideoPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [videoList, updateVideo] = useState([]);
    const [currentVideo, updateVideoDetails] = useState([]);
    const [upVote, upVoter] = useState(0);
    const [downVote, downVoter] = useState(0);

    const { id } = useParams();
    console.log("url ",id)

    useEffect(()=>{
        (async() => {
            //get video details directly with ID: await getVideoDetails();
            window.scrollTo(0,0);
            const videos = await performAPICall();
            const currVideo = videos.find(v => v._id === id);
            await viewCount();
            updateVideoDetails(currVideo);
        })()
    },[id]);

    const performAPICall = async () =>{
        try {
            const response = await axios(`${config.endpoint}`);
            updateVideo(response.data.videos);
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

    const handleVotes = async(videoId, voteType, changeType) => {
        try {
            let obj = JSON.stringify({ vote: voteType, change: changeType});
            //for actual logic use the id
            // const res = await axios.patch(`${config.endpoint}s/${videoId}/votes`,obj);
            const res = await axios.patch(`${config.endpoint}s/60331f421f1d093ab5424489/votes`,obj);
           if(res.status && voteType=="upVote")
           upVoter(upVote+1);
           else
           downVoter(downVote+1);
        } catch (error) {
            if(error.response && error.response.status === 500){
                enqueueSnackbar(error.response.message,{variant:'error'});
                return null;
            }
            else{
                enqueueSnackbar("No video found with matching id",{variant:'error'});
            }
        }
    }
    const viewCount = async() =>{
        try {
            const res = await axios.patch(`${config.endpoint}s/60331f421f1d093ab5424489/views`);
            return true;
        } catch (error) {
            if(error.response && error.response.status === 500){
                enqueueSnackbar(error.response.message,{variant:'error'});
                return null;
            }
            else if(error.response && error.response.status === 404){
                enqueueSnackbar("No video found with matching id",{variant:'error'});
            }
            else{
                enqueueSnackbar(`\"id\" must be a valid mongo id`,{variant:'error'});
            }
        }
    }
    // const getVideoDetails = async() => {
    //     try {
    //         const response = await axios(`${config.endpoint}/${id}`);
    //         updateVideoDetails(response.data);
    //         return response.data;
    //     } catch (error) {
    //         if(error.response && error.response.status === 500){
    //             enqueueSnackbar(error.response.message,{variant:'error'});
    //             return null;
    //         }
    //         else{
    //             enqueueSnackbar("Something went wrong. Check the backend console for more details",{variant:'error'});
    //         }
    //     }
    // }

    return(
        <Box>
            <Header></Header>
            <Box className="videoPlayer">
            <Box className="video">
            <iframe src={`https://www.${currentVideo.videoLink}?autoplay=1&mute=1`} className="videoIframe" title={`${id}`}/>
            </Box>
            {/* video details */}
            <Stack className="videoData" direction="row" justifyContent="space-between" alignItems="flex-start">
            <Stack className="videoDetails">
            <Typography className="title" variant="h6">{currentVideo.title}</Typography>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Typography className="views" variant="caption">{currentVideo.viewCount} Views</Typography>
            {/* <div className="period"></div> */}
            <Box className="period"></Box>
            <Typography className="releaseDate" variant="caption">{currentVideo.releaseDate}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Typography className="ageRating" variant="caption">{currentVideo.contentRating}</Typography>
            <Box className="period"></Box>
            <Typography className="genres" variant="caption">{currentVideo.genre}</Typography>
            </Stack>
            </Stack>
            {/* votes section */}
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Button variant="contained" startIcon={<Like className="iconColor"/>} className="votes" onClick={ async() =>{ await handleVotes(id, "upVote", "increase")}}>{upVote}</Button>
            <Button variant="contained" startIcon={<Dislike className="iconColor"/>} className="votes" onClick={async() =>{ await handleVotes(id, "downVote", "increase")}}>{downVote}</Button>
            </Stack>
            </Stack>

            
            </Box>
            <Dashboard videos={videoList}></Dashboard>
        </Box>
    )
}

export default VideoPage;