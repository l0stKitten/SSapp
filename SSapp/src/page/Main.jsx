import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import LogoMenu from '../components/Menu';
import Post from '../components/Posts';
import { Grid2 } from '@mui/material';

import CreatePost from '../components/CreatePosts';

const drawerWidth = 240;

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

export default function PersistentDrawerLeft() {

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <LogoMenu/>
        <Main>
            <DrawerHeader />
            <Grid2 container spacing={2} marginRight={2}>
                <Grid2 container item xs={10} 
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <CreatePost></CreatePost>
                    {Array.from(Array(6)).map((_, index) => (
                    <Post key={index}>xs=8</Post>
                    ))}
                </Grid2>
                
            </Grid2>
        </Main>
    </Box>
  );
}