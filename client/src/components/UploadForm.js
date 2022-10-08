import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./UploadForm.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from "./ProgressBar";
import { ImageContext } from "../context/ImageContext";

const UploadForm = () => {
    const { images, setImages, myImages, setMyImages, isPublic, setIsPublic } = useContext(ImageContext);
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
        formData.append("public", isPublic);
        try{
            const res = await axios.post("/images", formData, {
                headers:{ "Content-Type":"multipart/form-data"},
                onUploadProgress: (e => {
                    setPercent(Math.round(100 * e.loaded) / e.total);
                })
            });
            if(isPublic) setImages([...images, res.data]);
            else setMyImages([...myImages, res.data])
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
            setFileName(defaultFileName);
            setFile(null);
            setImgSrc(null);
            toast.error(err.response.data.errorMessage);
        }
    }

    return (
    <div>
        <form onSubmit={onSubmit}>
            {imgSrc && <img src={imgSrc} alt="" className="image-preview"/>}
            <ProgressBar percent={percent}/>
            <div className="file-dropper">
            {fileName}
            <input id="image" type="file" accept="image/*" onChange={handleFileChange}></input>
            </div>
            <input type="checkbox" id="public check" value={!isPublic} onChange={()=> setIsPublic(!isPublic)}/>
            <label htmlFor="public check">비공개</label>
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