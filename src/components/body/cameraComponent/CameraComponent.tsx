// OUTER
import React, {useState, useEffect} from 'react'


//LOCAL
import ClassCameraItem from "./CameraFirst/ClassCameraItem";



const CameraComponent: React.FC = () => {
    return (
        <div className="cameraContainer">

            <span>PerspectiveCamera </span>
            <ClassCameraItem/>
            <br/>
            <span>PerspectiveCamera </span>
            <ClassCameraItem/>
        </div>
    )
}

export default CameraComponent
