// OUTER
import React, {useEffect, useMemo, useRef, useState} from 'react'

//LOCAL
import {BaseCreator} from "../../../threejs/root";
import {creatPerspectiveCamera} from "../../../threejs/scene&camera";



const BoxComponent: React.FC = (props) => {
    const canvasContainer= useRef(null)

    const [width, setWidth] = useState(window.outerWidth)
    const [height, setHeight] = useState(window.outerHeight)

    const camera = useMemo(()=>creatPerspectiveCamera(width,height),[width,height])

    const canvas= useRef(new BaseCreator(camera,width,height))


    useEffect(() => canvas.current.init(canvasContainer), [])

    return (
        <>
            <div ref={canvasContainer} style={{position:"absolute", top:0,left:0}}/>
        </>


    )
}

export default BoxComponent
