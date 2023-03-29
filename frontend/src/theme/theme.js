import { createTheme } from "@mui/material/styles";
import { blue, blueGrey} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blueGrey[500],
    },
  },
});

export default theme;