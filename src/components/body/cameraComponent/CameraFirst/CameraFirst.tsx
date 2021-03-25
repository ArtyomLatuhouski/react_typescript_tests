// OUTER
import React, {useState, useEffect, useRef,useMemo} from 'react'
import {addCustomSceneObjects, Creator} from "../utilits/elementCreator";

//LOCAL



const CameraFirst: React.FC = () => {
    const canvasElem = useRef(null)

    const element =new Creator ([addCustomSceneObjects(0,0,0),addCustomSceneObjects(4,0,0)])
    useEffect(()=>element.init(canvasElem),[])
    return (

        <div ref={canvasElem}  >

        </div>
    )
}

export default CameraFirst
