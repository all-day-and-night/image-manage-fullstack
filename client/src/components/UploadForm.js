import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./UploadForm.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from "./ProgressBar";
import { ImageContext } from "../context/ImageContext";

const UploadForm = () => {
    const [images, setImages] = useContext(ImageContext);
    const defaultFileName = "이미지 파일을 업로드 해주세요.";
    const [file, setFile] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [fileName, setFileName] = useState("이미지 파일을 업로드 해주세요.");
    const [percent, setPercent]  = useState(0);
    
    const handleFileChange = (event) => {
        const imageFile = event.target.files[0];
        setFile(imageFile);
        setFileName(imageFile.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.onload = e => setImgSrc(e.target.result);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        try{
            const res = await axios.post("/images", formData, {
                headers:{ "Content-Type":"multipart/form-data"},
                onUploadProgress: (e => {
                    setPercent(Math.round(100 * e.loaded) / e.total);
                })
            });
            console.log({res});
            setImages([...images, res.data]);
            toast.success("success!!");
            setTimeout(() => {
                setPercent(0);
                setFileName(defaultFileName);
                setFile(null);
                setImgSrc(null);
            }, 3000);
        } catch(err){
            console.log(err);
            setPercent(0);
            toast.error(err.message);
        }
    }

    return (
    <div>
        <form onSubmit={onSubmit}>
            {imgSrc && <img src={imgSrc} className="image-preview"/>}
            <ProgressBar percent={percent}/>
            <div className="file-dropper">
            {fileName}
            <input id="image" type="file" accept="image/*" onChange={handleFileChange}></input>
            </div>
            <button type="submit" 
                    style={{width: "100%", 
                            height:40, 
                            borderRadius:"3px", 
                            cursor:"pointer"}}
            >제출</button>  
        </form>
    </div>)
}

export default UploadForm;