import React from 'react';
import Signup from "./components/Signup";
import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import { UserContextProvider } from "./Contexts/UserContext";
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/create" element={<CreatePost />} />
        <Route exact path="/post/:id" element={<PostPage />} />
        <Route exact path="/editPost/:id" element={<EditPost />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App