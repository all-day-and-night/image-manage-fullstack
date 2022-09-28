import React from "react";
import { ToastContainer } from "react-toastify";
import ImageList from "./components/ImageList";
import UploadForm from "./components/UploadForm";

const App = () => {
  return (
    <div style={{ maxWidth: 600, margin:"auto"}}>
      <ToastContainer/>
      <h2>사진첩</h2>
      <UploadForm/>
      <ImageList/>
    </div>
    
  );
}

export default App;
