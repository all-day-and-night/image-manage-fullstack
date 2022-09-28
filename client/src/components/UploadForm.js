import React, { useState, useEffect } from "react";
import axios from "axios";


const UploadForm = () => {

    
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("이미지 파일을 업로드 해주세요.");
    
    const handleFileChange = (event) => {
        const imageFile = event.target.files[0];
        setFile(imageFile);
        setFileName(imageFile.name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        try{
            const res = await axios.post("/upload", formData, {
                headers:{ "Content-Type":"multipart/form-data"},
            });
            console.log({res});
        } catch(err){
            alert("fail");
            console.log(err);
        }
    }

    return (
    <div>
        <form onSubmit={onSubmit}>
            <label htmlFor="image">{fileName}</label>
            <input id="image" type="file" onChange={handleFileChange}></input>
            <button type="submit">제출</button>  
        </form>
    </div>)
}

export default UploadForm;