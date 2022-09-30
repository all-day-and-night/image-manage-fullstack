import React from "react";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Toolbar from "./components/Toolbar";

const App = () => {
  return (
    <div style={{ maxWidth: 600, margin:"auto"}}>
      <ToastContainer/>
      <Toolbar/>
      <Routes>
        <Route path="/" element={ <MainPage /> }/>
        <Route path="/auth/register" element={ <RegisterPage />}/>
        <Route path="/auth/login" element={ <LoginPage /> }/>
      </Routes>
    </div>
  );
}

export default App;
