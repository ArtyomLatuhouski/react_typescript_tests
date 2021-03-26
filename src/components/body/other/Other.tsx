// OUTER
import React, {useState, useEffect} from 'react'
import CameraFirst from "../cameraComponent/CameraFirst/CameraFirst";
import ClassCameraItem from "../cameraComponent/CameraFirst/ClassCameraItem";


//LOCAL



const Other: React.FC = () => {
    return (
        <>
            <CameraFirst />
            <span>PerspectiveCamera </span>
            <ClassCameraItem/>

        </>
    )
}

export default Other
