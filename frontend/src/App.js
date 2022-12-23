// import logo from './logo.svg';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";
import React from 'react';
import "./App.css";
import LandingPage from "./components/LandingPage";
import VideoPage from "./components/VideoPage";
import theme  from "./theme.js";
import { ThemeProvider } from '@mui/material/styles';


export const config = {
  endpoint: `https://99e3f1e2-d162-4cbb-a2bb-ef2f8a696ab5.mock.pstmn.io/v1/video`,
};

function App() {
  return (
    <Router>
    <div className="App">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <React.StrictMode>
        {/* <ThemeProvider theme={theme}> */}
          <Switch>
            <Route path="/video/:id"><VideoPage/></Route>
            <Route path="/"><LandingPage/></Route>
          </Switch>
          {/* </ThemeProvider> */}
        </React.StrictMode>
    </div>
    </Router>
  );
}

export default App;
