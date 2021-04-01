// OUTER
import React, {useEffect, useMemo, useRef, useState} from 'react'

//LOCAL
import {BaseCreator, Creator} from "../../../threejs/root";
import {creatPerspectiveCamera} from "../../../threejs/scene&camera";
import {creatBox} from "../utilits/creatMashElemFunctions";



const BoxComponent: React.FC = (props) => {
    const canvasContainer= useRef(null)

    const [width, setWidth] = useState(window.outerWidth)
    const [height, setHeight] = useState(window.outerHeight)

    const camera = useMemo(()=>creatPerspectiveCamera(width,height,0,10,21),[width,height])

    const canvas= useRef(new Creator(camera,width,height))

    useEffect(() => {
        canvas.current.init(canvasContainer, true)
    }, [])

    useEffect(()=> {
        canvas.current.addElement(creatBox(1, 1, 1))
    },[])

    useEffect(()=> {
        canvas.current.startWindowResize()
        return canvas.current.stopWindowResize()
    },[])

    return (
        <>
            <div ref={canvasContainer} style={{position:"absolute", top:0,left:0,zIndex:-1}}/>
        </>
    )
}

export default BoxComponent
