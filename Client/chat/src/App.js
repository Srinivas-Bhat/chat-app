import React from 'react'
import './App.css';
import {Routes, Route} from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Chat from './Pages/Chat';
import SetAvatar from './Pages/SetAvatar';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/setAvatar" element={<SetAvatar/>} />
      <Route path="/" element={<Chat/>} />
    </Routes>
  );
}

export default App;
