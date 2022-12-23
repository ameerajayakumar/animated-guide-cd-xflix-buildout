import React from "react";
import VideoCard from "./VideoCard.js";
import {Grid} from '@mui/material';
import "./Dashboard.css";

const Dashboard = ({videos}) => {
    return (
        <Grid container className="dashboardBody" spacing={2} >
                {videos.map((video) => (
                    <Grid item md={3} xs={6} className="gridItem" key={video._id}>
                    <VideoCard video={video}></VideoCard>
                    </Grid>
                ))}
        </Grid>
    );
}

export default Dashboard;