import React, { Fragment} from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MuiAppBar from '@mui/material/AppBar';

const drawerWidth = 245;
const drawerWidthClosed = 50;
const drawerWidthOpenGap = 60;
const drawerWidthOpenGapRight = 30;
const drawerMarginTop = 20;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        width: `680px`, // Fixed width of 680px
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
}));

const CustomAppBar = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme }) => ({
        backgroundColor: '#F2E8DA',
        // Ensure the AppBar is centered both horizontally and vertically
        position: 'fixed',
        left: '50%',
        top: '5%',
        transform: 'translate(-50%, -50%)', // Center using transform
        width: '680px', // Fixed width
        height: '80px', // Adjust height as needed
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        borderRadius: '12px',
}));

export default function LogoMenu() {
	return (
		<Fragment>
			<CustomAppBar elevation={0} position="fixed">
				<Typography
					variant="h3"
					noWrap
					component="a"
					href="#app-bar-with-responsive-menu"
					sx={{
						fontFamily: '"Archivo Black", sans-serif', // Use the font here
						fontWeight: 400, // Ensure correct weight is used
						fontStyle: 'normal',
						color: 'rgba(82, 42, 40, 1)', // Custom color
						textDecoration: 'none',
					}}
				>
					logo.
				</Typography>
			</CustomAppBar>
		</Fragment>
	);
}
