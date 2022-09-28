import React from "react";
import { ToastContainer } from "react-toastify";
import UploadForm from "./components/UploadForm";

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <h2>사진첩</h2>
      <UploadForm/>
    </div>
    
  );
}

export default App;
