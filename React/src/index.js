import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import './bootstrap.scss';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import LoginForm from './login';
import Body from './main'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './user_profile';
import { useParams } from 'react-router';


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
              {/* <Route path="/user/:username" element={<UserProfile/>} /> */}
              <Route path="/user/:username" element={<Child/>} />
              <Route path="/login" element={<LoginForm state={this.state} />} />
            </Routes>
          </BrowserRouter>
        </div>
      )
    }
  }

  function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { username } = useParams();
  
    return (
      <UserProfile username={username}/>
    );
  }
  



  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Router />
  );  
  