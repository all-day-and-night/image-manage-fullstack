import React, { useState } from "react";
 
const CustomInput = ({ label, value, setValue, type="text" }) => {
    
    return (
        <div>
            <label>{label}</label>
            <input
                style={{ width: "100%" }}
                value={value}
                type={type}
                onChange={e => setValue(e.target.value)} />
        </div>
    )
}

export default CustomInput;