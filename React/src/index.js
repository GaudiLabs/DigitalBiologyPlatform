import React from 'react';
import Fragment from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import './bootstrap.scss';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import AdaptorComponent from './adaptor';
//import GridLayout from "react-grid-layout";
//import Preferences from './Preferences';
import LoginForm from './login';
import Body from './main'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderTop from './header';
import ProtocolsLister from './protocols_lister';
import SideButtons from './side_buttons';
import EditorButtons from './editor_buttons';
import { Responsive, WidthProvider } from "react-grid-layout";
import { GenerateAuthHeader, SimpleHash } from "./utils";
import { faUtensilSpoon } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SwitchTheme } from './graphics';


import { SaveDialog, DeleteDialog, UnsavedDialog } from './dialogs';
import { DateTime } from "luxon";


class Router extends React.Component {

    constructor(props) {
        super(props);
    }
  
    render() {

      return (
        <div className="wrapper">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Body/>} />
              <Route path="/login" element={<LoginForm state={this.state} />} />
            </Routes>
          </BrowserRouter>
        </div>
      )
    }
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  //root.render(<Game />);
  root.render(
    <Router />
  );  
  