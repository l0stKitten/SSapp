import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';

const CreatePost = ({ onPost }) => {
    const [postContent, setPostContent] = useState('');

    const handleButtonClick = () => {
        // Trigger the click event of the file input
        fileInputRef.current.click();
    };

    const handleCancelClick = () => {
        setPostContent('')
        setUploadedImage(null)
    };

    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = () => {
        // Pass the post content to the parent component for further handling
        onPost(postContent);

        // Clear the input field after submitting the post
        setPostContent('');
    };

    return (
        <Card sx={{ minWidth: 680, boxShadow:0, borderRadius: 3}}>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: "#FFBE98" }} aria-label="recipe">
                    A
                </Avatar>
            }
            title="Anonimus"
            subheader="September 14, 2016"
        />
        <CardContent>
            <TextField
                multiline
                rows={4}
                variant="outlined"
                placeholder="What's on your mind?"
                fullWidth
                value={postContent}
                onChange={handlePostContentChange}
            />
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end' }}>
            <ButtonGroup variant="text" color="error" aria-label="text button group" >
                <Tooltip title={"Cancelar"} placement="top" >
                <IconButton aria-label="cancel"
                    color="secondary"
                    onClick={handleCancelClick}
                >
                    <CancelOutlinedIcon />
                </IconButton>
                </Tooltip>
                
                <Tooltip title={"Postear"} placement="top" >
                    <IconButton aria-label="post"
                        color="primary"
                    >
                        <SendOutlinedIcon />
                    </IconButton>
                </Tooltip>
                
            </ButtonGroup>
        
        </CardActions>
        
        </Card>
    );
};

export default CreatePost;