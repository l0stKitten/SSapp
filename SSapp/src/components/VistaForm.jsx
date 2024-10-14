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

    const handleCancelClick = () => {
        setPostContent('');
    };

    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = () => {
        if (postContent.trim()) {
            // Pass the post content to the parent component
            onPost(postContent);
            // Clear the input field after submitting the post
            setPostContent('');
        }
    };

    return (
        <Card sx={{ minWidth: 680, boxShadow: 0, borderRadius: 3 }}>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: "#FFBE98" }} aria-label="recipe">A</Avatar>}
                title="Anonymous"
                subheader={new Date().toLocaleDateString()}
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
                <ButtonGroup variant="text" color="error" aria-label="text button group">
                    <Tooltip title="Cancel" placement="top">
                        <IconButton aria-label="cancel" color="secondary" onClick={handleCancelClick}>
                            <CancelOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Post" placement="top">
                        <IconButton aria-label="post" color="primary" onClick={handlePostSubmit}>
                            <SendOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
};

export default CreatePost;