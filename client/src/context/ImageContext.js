import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import App from "../App";

export const ImageContext = createContext();

export const ImageProvider = (prop) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        axios
            .get("/images")
            .then((result => {
                setImages(result.data)
            }))
            .catch(err => {console.log(err)})
            
    }, []);

    return (
        <ImageContext.Provider value={[images, setImages]}>
            {prop.children}
        </ImageContext.Provider>
    );
}