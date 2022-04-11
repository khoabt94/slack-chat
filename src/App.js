import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Chat from "./components/Chat.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./components/Login.jsx";
import { auth } from "./firebase";
import Loading from "./components/Loading.jsx";
import Details from "./components/Details.jsx";
import { appActions } from "./slice/appSlice.js";
import { useDispatch } from "react-redux";

const App = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="app">
      <Header />
      {loading && <Loading />}
      {!user ? (
        <Login />
      ) : (
        <>
          <Sidebar />
          <Chat />
          <Details />
        </>
      )}
    </div>
  );
};

export default App;
