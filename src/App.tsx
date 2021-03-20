import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './features/header/Header';
import Side from './features/side/Side';
import Main from './Main';
//import Dialog from './features/dialog/compornents/Success';
import SnackAlert from './features/snack/SnackAlert';
import ModalWindow from './features/modal/ModalWindow';
import FullScreenDialog from './features/dialog/fullScreen/FullScreenDialog';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './app/theme';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Side />
          <Main />
        </Router>
        {/*
        <Dialog />
        */}
        <SnackAlert />
        <ModalWindow />
        <FullScreenDialog />
      </ThemeProvider>
    );
  }
}

export default App;
