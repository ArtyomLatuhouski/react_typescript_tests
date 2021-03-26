// OUTER
import React, {useState, useEffect} from 'react'


//LOCAL
import ClassCameraItem from "./CameraFirst/ClassCameraItem";
import CameraFirst from "./CameraFirst/CameraFirst";



const CameraComponent: React.FC = () => {
    return (
        <>
            <CameraFirst />
            <span>PerspectiveCamera </span>
            <ClassCameraItem/>

        </>
    )
}

export default CameraComponent
