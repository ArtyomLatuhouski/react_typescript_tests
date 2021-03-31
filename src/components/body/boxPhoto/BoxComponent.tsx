// OUTER
import React, {useEffect, useMemo, useRef, useState} from 'react'
import * as THREE from "three"

//LOCAL
import {creatBox, generationCubs} from "../utilits/creatMashElemFunctions";
import {Creator} from "../utilits/elementCreator";
import {lightThreePoints} from "../utilits/otherConstructors";
import {creatScene} from "../utilits/creatSceneFunction";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {BaseCreator} from "../../../threejs/root";





const BoxComponent: React.FC = (props) => {
    const canvasElemRef1 = useRef(null)
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    const camera = useMemo((width,height)=>{
        const  cameraPoint = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000)
        cameraPoint.position.z = 21;
        cameraPoint.position.y = 15;
        return cameraPoint
    },[width,height])


    const canvas= useRef(new BaseCreator(camera))
    useEffect(() => {

    }, [])

    return (
        <>
            <div ref={canvasElemRef1}/>
        </>


    )
}

export default BoxComponent
