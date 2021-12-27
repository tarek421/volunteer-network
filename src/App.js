import React, {createContext, useState} from 'react';
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./component/Home/Home";
import { Toaster } from "react-hot-toast";
import Login from "./component/Login/Login";
import Donation from './component/Donation/Donation';
import PrivetRoute from './component/PrivetRoute/PrivetRoute';
import Admin from './component/Admin/Admin';
export const userContext = createContext({});

function App({children}) {

    const userInfoJson = localStorage.getItem('login');
    const userInfo = JSON.parse(userInfoJson);
    const [loggedInUser, setLogedInUser] = useState(userInfo);
  return (
    <userContext.Provider value={[loggedInUser, setLogedInUser]}>
      {children}
      <Toaster position="top-center" reverseOrder={true} />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        
          <Route path="/admin" element={<PrivetRoute>
            <Admin />
          </PrivetRoute>} />

        <Route path="/donation" element={<PrivetRoute>
          <Donation />
        </PrivetRoute>} />

      </Routes>
    </userContext.Provider>
  );
}

export default App;
