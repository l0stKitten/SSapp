import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
	typography: {
		fontFamily: [
		  `'Inter', 'sans-serif'`,
		].join(','),
	},
	palette: {
		type: 'light',
		primary: {
		  main: '#28D2CD',
		},
		secondary: {
		  main: '#f40952',
		},
		background: {
		  default: '#f4f5f9',
		},
		error: {
		  main: '#AC20EE',
		},
		warning: {
		  main: '#FFBE1C',
		},
		info: {
		  main: '#A49D97',
		},
		success: {
		  main: '#00e676',
		},
		divider: '#9e9e9e',
	}
})

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
	</StrictMode>,
)