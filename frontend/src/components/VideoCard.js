import React from "react";
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import "./VideoCard.css";

const  VideoCard = ({video}) => {
    // sx={{height:"100%"}}
    return (
        <Link className="link" to={`/video/${video._id}`}>
        <Card className="videotile" >
            <CardActionArea className="cardAction" >
                <CardMedia className="videoImage" component="img" image ={video.previewImage} alt="" height=""/>
                <CardContent className="cardContent">
                    <Typography className="videoTitle">{video.title}</Typography>
                    <Typography className="videoRDate">{video.releaseDate}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </Link>
    );
}

export default VideoCard;