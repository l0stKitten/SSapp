import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import LogoMenu from '../components/Menu';
import VistaResultados from '../components/VistaResultados';
import { Grid2 } from '@mui/material';

import VistaForm from '../components/VistaForm';


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function MainPage() {
  const [posts, setPosts] = useState([]); // State for posts

  const handleAddPost = (content) => {
    const newPost = { content, date: new Date().toLocaleDateString() };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <LogoMenu />
      <Main>
        <DrawerHeader />
        <Grid2 >
          <Grid2
            container
            spacing={2}
            xs={10}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <VistaForm onPost={handleAddPost} />

            {posts.map((post, index) => (
              <VistaResultados key={index} content={post.content} date={post.date} />
            ))}
          </Grid2>
        </Grid2>
      </Main>
    </Box>
  );
}