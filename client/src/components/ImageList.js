import React, { useContext, useEffect, useState }  from "react";
import { AuthContext } from "../context/AuthContext";
import { ImageContext } from "../context/ImageContext";

const ImageList = () => {
    const { images, myImages, isPublic, setIsPublic } = useContext(ImageContext);
    const [me] = useContext(AuthContext);
    // eslint-disable-next-line jsx-a11y/alt-text
    const imgList = (me && isPublic ? myImages : images).map(image => 
    (
        <img 
            alt=""
            key={image.key} 
            style={ {width:"100%"}} 
            src={`http://localhost:5001/uploads/${image.key}`}
        />
    ));
    
    return (
        <div>
  
            <h3 style={{ display: "inline-block", marginRight: 10 }}>
                Image List
                {isPublic ? "개인" : "공개"} 사진
            </h3><button onClick={() => { setIsPublic(!isPublic); } }>{isPublic ? "공개" : "개인"} 사진보기</button>
            {imgList}
        </div>
    );
}

export default ImageList;