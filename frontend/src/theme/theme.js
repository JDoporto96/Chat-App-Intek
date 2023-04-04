import { createTheme } from "@mui/material/styles";
import { blue, blueGrey, lightGreen, red} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: lightGreen[500],
    },
  },
  components:{
    MuiAvatar:{
      styleOverrides: {
        root:{
          margin:"0.5rem",
        }
       }
    },
    MuiButton:{
     styleOverrides: {
      root:{
        marginTop:"1rem",
        marginBottom:"1rem"
      }
     }
    },
    MuiBox:{
      styleOverrides: {
        root:{
          display:"flex"
        }
       }
    }  
  }
});

export default theme;