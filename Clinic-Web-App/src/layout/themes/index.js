import { createTheme } from "@mui/material/styles";
import { grey , red} from "@mui/material/colors";
// 
// import { ListItemText } from '@mui/material';


export const LightTheme = createTheme({
    direction:"rtl",
    palette:{
        mode:"light",
        primary: {
            main: '#238BEB',
            
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
          grey:{
            light:grey[200],
            main:grey[500],
            dark:grey[900],
            text:'#6C6C6C'
          },
          danger:{
            light:red[200],
            main:red[500],
            dark:red[900]
          }

    },
    typography:{
        fontFamily:"YekanBakh"
    }
})
export const DarkTheme = createTheme({
  direction: 'rtl',
  palette: {
    // TODO: dark mode colors should change 
    mode: 'dark',
      background:{
      default:"#37474f",
      paper:"#37474f",
    },
    text:{
      primary:'#fff',
      secondary:'#fff',
      disabled:'#fff',
    },
    action:{
      active:'#fff',
      disabled:'#fff',
      hover:'#fff',
    },
  },
  typography: {
    fontFamily: 'YekanBakh',
     color:"#fff", 
    },
  
  },
);
