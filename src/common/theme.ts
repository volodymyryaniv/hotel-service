import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#00695c',
      light: '#e4edea',
      dark: '#515453',
    },
    secondary: {
      main: '#FFFFFF',
      light: '#9e9e9e',
      dark: '#eddae0',
    },
  },
  typography: {
    fontSize: 15,
    h3: {
      fontSize: '40px',
      fontWeight: 700,
      letterSpacing: '-1.5px',
    },
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          maxWidth: '100%',
        },
      },
    },
  },
});

export default defaultTheme;
