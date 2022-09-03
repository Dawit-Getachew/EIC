import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline  } from '@mui/material';
import "@fontsource/poppins"
import "@fontsource/inter"
import "@fontsource/roboto"

// Registered In(Country)

const App = () => {
  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
