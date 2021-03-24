// OUTER
import React, {useState, useEffect} from 'react'


//LOCAL
import CameraFirst from "./CameraFirst/CameraFirst";
// @ts-ignore
import ClassCameraItem from "./CameraFirst/ClassCameraItem";

const CameraComponent: React.FC = () => {
    return (
        <div className="cameraContainer">
            {/*<CameraFirst/>*/}
            <ClassCameraItem/>
        </div>
    )
}

export default CameraComponent
