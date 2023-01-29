import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import './bootstrap.scss';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import LoginForm from './login';
import Body from './main'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


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
  root.render(
    <Router />
  );  
  