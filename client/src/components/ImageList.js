import React, { useContext, useEffect, useState }  from "react";
import { ImageContext } from "../context/ImageContext";

const ImageList = () => {

    const [images] = useContext(ImageContext);
    // eslint-disable-next-line jsx-a11y/alt-text
    const imgList = images.map(image => 
    (
        <img 
            key={image.key} 
            style={ {width:"100%"}} 
            src={`http://localhost:5001/uploads/${image.key}`}
        />
    ));
    
    return (
        <div>
            ImageList
            {imgList}
        </div>
    );
}

export default ImageList;